import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

const FormButtons = ({ onNext, onBack, isLastStep, isFirstStep, isLoading, onSubmit }) => {
  const { formState: { isSubmitting }, handleSubmit } = useFormContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Combined loading state
  const isProcessing = isLoading || isSubmitting;

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

  // Loading animation for submit button
  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
  };

  // Handle last step click
  const handleLastStepClick = () => {
    if (!showConfirmation) {
      // First click - show confirmation dialog
      setShowConfirmation(true);
    } else {
      // Second click - actually submit the form
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    }
  };

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
      {!isFirstStep ? (
        <motion.button
          type="button"
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
          className="flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-sm
                    border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          onClick={() => {
            // Reset confirmation state when going back
            if (isLastStep && showConfirmation) {
              setShowConfirmation(false);
            }
            onBack();
          }}
          disabled={isProcessing}
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>
      ) : (
        <div className="w-24"></div> // Spacer when there's no back button
      )}

      {isLastStep && showConfirmation ? (
        // Confirmation button
        <motion.button
          type="button"
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
          disabled={isProcessing}
          className="flex items-center px-8 py-3 font-medium rounded-lg shadow-sm transition-all duration-200
                    bg-green-600 text-white hover:bg-green-700"
          onClick={handleLastStepClick}
        >
          {isProcessing ? (
            <>
              <motion.svg 
                variants={loadingVariants}
                animate="animate"
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </motion.svg>
              Processing...
            </>
          ) : (
            <>
              Confirm Registration
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </motion.button>
      ) : (
        // Regular next/submit button
        <motion.button
          type="button" // Always button type to handle custom logic
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
          disabled={isProcessing}
          className={`flex items-center px-8 py-3 font-medium rounded-lg shadow-sm transition-all duration-200
                    ${isLastStep 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          onClick={isLastStep ? handleLastStepClick : onNext}
        >
          {isProcessing ? (
            <>
              <motion.svg 
                variants={loadingVariants}
                animate="animate"
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </motion.svg>
              Processing...
            </>
          ) : (
            <>
              {isLastStep ? 'Complete Registration' : 'Continue'}
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </motion.button>
      )}
      
      {/* Confirmation message */}
      {isLastStep && showConfirmation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 bottom-20 flex justify-center"
        >
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-2 rounded-md shadow-sm">
            Please review your information and click "Confirm Registration" to submit
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Default props
FormButtons.defaultProps = {
  isFirstStep: false,
  isLoading: false
};

export default FormButtons;