import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({ 
  label, 
  error, 
  icon,
  helperText,
  className = "",
  labelClassName = "",
  inputClassName = "",
  successMessage,
  placeholder = "",
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  
  // Generate consistent ID once
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Update filled state when value changes programmatically
  useEffect(() => {
    setFilled(!!props.value);
  }, [props.value]);
  
  // Handle input changes
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    setFilled(e.target.value !== '');
  };

  // Determine states
  const isError = !!error;
  const isSuccess = !isError && successMessage;
  const isActive = focused || filled;
  
  // We only show placeholder when field is focused but empty
  const showPlaceholder = focused && !filled;
  
  // Dynamic styles based on states
  const getBorderColor = () => {
    if (isError) return 'border-red-300';
    if (isSuccess) return 'border-green-300';
    if (focused) return 'border-blue-500';
    return 'border-gray-200';
  };
  
  const getRingColor = () => {
    if (isError) return 'ring-red-100';
    if (isSuccess) return 'ring-green-100';
    if (focused) return 'ring-blue-100';
    return '';
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative">
        {/* Floating label */}
        <motion.label
          htmlFor={inputId}
          className={`absolute left-3 text-sm font-medium pointer-events-none
            ${isActive ? 'top-2 text-xs' : 'top-[0.85rem]'}
            ${isError ? 'text-red-500' : isSuccess ? 'text-green-600' : focused ? 'text-blue-600' : 'text-gray-500'}
            ${labelClassName}`}
          initial={false}
          animate={{
            y: isActive ? -4 : 0,
            scale: isActive ? 0.85 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {label}
        </motion.label>

        {/* Input with container */}
        <div className="relative">
          <input
            id={inputId}
            className={`
              w-full px-3 rounded-lg border-2 bg-slate-800 transition-all duration-200
              ${isActive ? 'pt-6 pb-2' : 'py-3'}
              ${icon ? 'pl-10' : ''}
              ${getBorderColor()}
              focus:outline-none focus:ring-4 focus:ring-opacity-30 ${getRingColor()}
              ${inputClassName}
            `}
            placeholder={showPlaceholder ? placeholder : ""}
            onFocus={(e) => {
              setFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            onChange={handleChange}
            {...props}
          />
          
          {/* Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg 
                className={`w-5 h-5 ${focused ? 'text-blue-500' : 'text-gray-400'} transition-colors`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
              </svg>
            </div>
          )}
          
          {/* Status icon */}
          {(isError || isSuccess) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {isError ? (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Helper text or error message */}
      <AnimatePresence mode="wait">
        {isError ? (
          <motion.p 
            key="error"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-xs mt-1.5 flex items-center"
          >
            <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {typeof error === 'string' ? error : error?.message}
          </motion.p>
        ) : isSuccess ? (
          <motion.p 
            key="success"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-green-600 text-xs mt-1.5 flex items-center"
          >
            <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </motion.p>
        ) : helperText ? (
          <motion.p 
            key="helper"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
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

export default Input;