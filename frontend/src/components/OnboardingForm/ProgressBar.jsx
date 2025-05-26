import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  // Step labels with icons
  const stepInfo = [
    { label: 'Personal', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
    { label: 'Interests', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { label: 'Skills', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Confirm', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  return (
    <div className="mb-10 relative progress-bar-container">
      {/* Steps with connecting lines */}
      <div className="relative flex justify-between mb-6">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        
        {/* Active connector line (animated) */}
        <motion.div 
          className="absolute top-5 left-0 h-0.5 bg-blue-600 z-1"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        
        {/* Step indicators */}
        {stepInfo.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center progress-step"
            style={{ zIndex: 5 }} // Explicit z-index below navbar (which is 50)
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { delay: index * 0.15 }
              }}
              className="relative"
            >
              {/* Background circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                ${index < currentStep 
                  ? 'bg-blue-600 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {/* Check mark for completed steps */}
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // Icon for current and future steps
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={index === currentStep ? 2 : 1.5} d={step.icon} />
                  </svg>
                )}
                
                {/* Pulse effect for current step */}
                {index === currentStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </div>
              
              {/* Step number badge for active and future steps */}
              <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs
                ${index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-200 text-gray-600 border border-gray-300'
                }`}
              >
                {index + 1}
              </div>
            </motion.div>
            
            {/* Step label */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3 + index * 0.1 } 
              }}
              className={`mt-3 font-medium text-xs sm:text-sm whitespace-nowrap
                ${index <= currentStep 
                  ? 'text-blue-700' 
                  : 'text-gray-500'
                }`}
            >
              {step.label}
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Progress indicator with description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-3/4 h-2 bg-gray-100 rounded-full mb-2 sm:mb-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2
            }}
          >
            <motion.div 
              className="absolute right-0 top-0 h-2 w-2 bg-white rounded-full border-2 border-blue-600"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-right text-sm font-medium text-gray-600"
        >
          Step {currentStep + 1} of {totalSteps}
          <span className="ml-2 text-blue-600">({Math.round(progress)}%)</span>
        </motion.p>
      </div>

      {/* Add some global CSS to ensure proper position */}
      <style jsx global>{`
        /* Ensure progress bar always displays below navbar */
        .progress-bar-container {
          position: relative;
          z-index: 5;
          overflow: visible; /* Allow pulse effects to show */
        }
        
        /* For edge cases where scrolling might cause issues */
        @media screen and (max-height: 600px) {
          .progress-step {
            transform: scale(0.9);
          }
        }
        
        /* When navbar is sticky/fixed and overlaps, adjust progress bar */
        .form-content-wrapper {
          position: relative;
          z-index: 10;
        }
        
        /* Ensure proper stacking with navbar */
        nav, header {
          z-index: 50 !important;
        }
        
        /* Make sure pulsing effects don't overlap navbar */
        .progress-step .absolute {
          z-index: 5;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;