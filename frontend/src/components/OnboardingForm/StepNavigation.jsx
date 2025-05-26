import React from 'react';
import { motion } from 'framer-motion';

const StepNavigation = ({ currentStep, totalSteps, onNext, onBack, isSubmitting = false }) => {
  // Button hover animation
  const buttonHoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  // Button tap animation
  const buttonTapAnimation = {
    scale: 0.97,
    transition: { duration: 0.1 }
  };
  
  // Animation for loading spinner
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <motion.div 
      className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div>
        {currentStep > 0 ? (
          <motion.button
            type="button"
            className="group flex items-center px-5 py-2.5 rounded-lg bg-white border border-gray-200 shadow-sm
                      text-gray-700 font-medium text-sm transition-all duration-200
                      hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            onClick={onBack}
            disabled={isSubmitting}
            whileHover={buttonHoverAnimation}
            whileTap={buttonTapAnimation}
          >
            <motion.svg 
              className="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
              initial={{ x: 0 }}
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </motion.svg>
            Back
          </motion.button>
        ) : (
          // Empty div to maintain spacing when there's no back button
          <div className="w-24"></div>
        )}
      </div>

      <div className="flex items-center">
        <motion.div
          className="hidden sm:flex items-center mr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {totalSteps}
          </span>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-3">
            <motion.div 
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.button
          type="button"
          className={`group relative flex items-center justify-center px-6 py-2.5 font-medium rounded-lg text-white shadow-sm text-sm 
                    transition-all duration-200 min-w-[120px]
                    ${currentStep === totalSteps - 1 
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800' 
                      : 'bg-blue-600 hover:bg-blue-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    ${currentStep === totalSteps - 1 ? 'focus:ring-indigo-500' : 'focus:ring-blue-500'}`}
          onClick={onNext}
          disabled={isSubmitting}
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
        >
          {isSubmitting ? (
            <>
              <motion.svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={spinTransition}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </motion.svg>
              Processing...
            </>
          ) : (
            <>
              {currentStep === totalSteps - 1 ? 'Complete' : 'Continue'}
              <motion.svg 
                className="w-4 h-4 ml-2 text-white opacity-80 group-hover:opacity-100"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </motion.svg>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepNavigation;