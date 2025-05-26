import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Select = ({ 
  options = [], 
  value, 
  onChange, 
  label, 
  error = null,
  helperText,
  icon,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  multiple = false,
  required = false
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(!!value);
  const isActive = focused || filled;
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    setFilled(e.target.value !== '');
  };

  // Determine the select state for styling
  const isError = !!error;
  const borderColor = isError 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-300';

  // Chevron icon animation
  const chevronVariants = {
    focused: { rotate: 180, y: 0 },
    blurred: { rotate: 0, y: 0 }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative">
        {/* Floating label with animation */}
        <motion.label
          htmlFor={`select-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substr(2, 9)}`}
          className={`absolute left-3 font-medium transition-all duration-200 pointer-events-none
            ${isActive 
              ? 'transform -translate-y-[1.3rem] scale-75 text-xs px-1 z-10 bg-white' 
              : 'top-[0.9rem]'
            }
            ${isError 
              ? 'text-red-500'
              : focused 
                ? 'text-blue-600' 
                : 'text-gray-500'
            }
            ${disabled ? 'text-gray-400' : ''}`}
          animate={{
            y: isActive ? -20 : 0,
            scale: isActive ? 0.75 : 1,
            x: isActive ? -5 : 0
          }}
          transition={{
            type: "spring", 
            stiffness: 500, 
            damping: 30
          }}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Select container with animation */}
        <motion.div
          whileHover={disabled ? {} : { scale: 1.005 }}
          whileTap={disabled ? {} : { scale: 0.995 }}
          transition={{ duration: 0.1 }}
          className="relative"
        >
          <select
            id={`select-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substr(2, 9)}`}
            className={`
              appearance-none w-full px-3 py-[0.85rem] rounded-lg border-2 transition-all duration-200
              ${borderColor}
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              ${isActive ? 'pt-6 pb-2' : ''}
              ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
              ${icon ? 'pl-10' : ''}
              ${isError ? 'bg-red-50' : ''}
            `}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            multiple={multiple}
            required={required}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom icon if provided */}
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
              </svg>
            </div>
          )}
          
          {/* Custom chevron icon with animation */}
          <motion.div 
            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            variants={chevronVariants}
            animate={focused ? "focused" : "blurred"}
          >
            <svg className={`w-5 h-5 ${focused ? 'text-blue-500' : 'text-gray-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Helper text or error message with animation */}
      <AnimatePresence mode="wait">
        {isError ? (
          <motion.p 
            key="error"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-xs mt-1.5 flex items-center"
          >
            <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error.message || error}
          </motion.p>
        ) : helperText ? (
          <motion.p 
            key="helper"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 text-xs mt-1.5"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Select;