import React from 'react';
import { motion } from 'framer-motion';

/**
 * Professional Button component with multiple variants
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Button style variant (primary, secondary, outline, text)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {string} props.icon - Optional icon path for SVG
 * @param {boolean} props.iconRight - Whether icon should appear on the right
 */
const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  fullWidth = false,
  icon,
  iconRight = false,
  ...props 
}) => {
  // Hover animation variations
  const hoverAnimations = {
    primary: { scale: 1.03, boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)' },
    secondary: { scale: 1.03 },
    outline: { scale: 1.03, backgroundColor: 'rgba(0, 118, 255, 0.1)' },
    text: { scale: 1.03 }
  };
  
  // Tap animation variations
  const tapAnimations = {
    primary: { scale: 0.97 },
    secondary: { scale: 0.97 },
    outline: { scale: 0.97 },
    text: { scale: 0.97 }
  };

  // Base styles that apply to all button variants
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium tracking-wide rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

  // Size variations
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 focus:ring-1',
    md: 'text-sm px-4 py-2.5 focus:ring-2',
    lg: 'text-base px-6 py-3 focus:ring-2'
  };

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
      text-white shadow-sm
      focus:ring-blue-500
    `,
    secondary: `
      bg-gray-800 hover:bg-gray-900
      text-white shadow-sm
      focus:ring-gray-700
    `,
    outline: `
      border-2 border-blue-500 hover:bg-blue-50
      text-blue-600 hover:text-blue-700
      focus:ring-blue-500 bg-transparent
    `,
    text: `
      bg-transparent hover:bg-gray-100
      text-gray-700 hover:text-gray-900
      focus:ring-gray-300
    `
  };

  // Loading spinner animation
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  // Disabled styles
  const disabledStyles = props.disabled ? 
    'opacity-60 cursor-not-allowed' : 
    'cursor-pointer';

  return (
    <motion.button
      whileHover={props.disabled ? {} : hoverAnimations[variant]}
      whileTap={props.disabled ? {} : tapAnimations[variant]}
      transition={{ duration: 0.2 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <motion.svg
          className={`animate-spin h-4 w-4 ${children ? 'mr-2' : ''}`}
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
      )}

      {icon && !iconRight && !isLoading && (
        <svg className={`w-5 h-5 ${children ? 'mr-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
        </svg>
      )}

      {children}

      {icon && iconRight && !isLoading && (
        <svg className={`w-5 h-5 ${children ? 'ml-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
        </svg>
      )}
    </motion.button>
  );
};

export default Button;