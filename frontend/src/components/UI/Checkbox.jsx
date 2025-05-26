import React from 'react';
import { motion } from 'framer-motion';

const Checkbox = ({ 
  label, 
  disabled = false, 
  error = null,
  className = '',
  labelClassName = '',
  description = '',
  ...props 
}) => {
  // Animation variants for the check mark
  const checkVariants = {
    checked: { 
      opacity: 1, 
      pathLength: 1,
      transition: { duration: 0.2 }
    },
    unchecked: { 
      opacity: 0, 
      pathLength: 0,
      transition: { duration: 0.2 }
    }
  };

  // Animation for the checkbox container
  const boxVariants = {
    hover: { 
      scale: 1.05,
      borderColor: disabled ? '' : '#3B82F6',
      transition: { duration: 0.15 }
    },
    tap: { 
      scale: 0.95 
    },
    initial: { 
      scale: 1 
    }
  };

  // Generate a unique ID
  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`mb-2 ${className}`}>
      <motion.div 
        className={`flex items-center ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        whileHover={disabled ? {} : "hover"}
        whileTap={disabled ? {} : "tap"}
        initial="initial"
        variants={boxVariants}
      >
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="sr-only" // Hide the actual input visually
            disabled={disabled}
            {...props}
            id={checkboxId}
          />
          
          <motion.div 
            className={`
              h-5 w-5 rounded border-2 flex items-center justify-center
              transition-colors duration-200 mr-2
              ${disabled 
                ? 'border-gray-300 bg-gray-100' 
                : props.checked 
                  ? 'border-blue-600 bg-blue-600' 
                  : error 
                    ? 'border-red-500' 
                    : 'border-gray-300 hover:border-blue-500'
              }
            `}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className={`w-3.5 h-3.5 ${props.checked ? 'text-white' : 'text-transparent'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                variants={checkVariants}
                initial={props.checked ? "checked" : "unchecked"}
                animate={props.checked ? "checked" : "unchecked"}
              />
            </motion.svg>
          </motion.div>
          
          {/* Ripple effect when checked */}
          {props.checked && (
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-full"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ zIndex: -1 }}
            />
          )}
        </div>

        <div>
          <label 
            htmlFor={checkboxId}
            className={`
              select-none text-sm font-medium
              ${disabled 
                ? 'text-gray-500' 
                : error 
                  ? 'text-red-700' 
                  : 'text-gray-700'}
              ${labelClassName}
            `}
          >
            {label}
          </label>
          
          {description && (
            <p className="mt-0.5 text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>
      </motion.div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1"
        >
          {typeof error === 'string' ? error : error.message}
        </motion.p>
      )}
    </div>
  );
};

export default Checkbox;