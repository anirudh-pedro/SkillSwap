import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Input from '../UI/Input';
import { fadeIn } from '../animation/transition';

const EducationStep = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const [institutionSuggestions, setInstitutionSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);
  
  // Watch the college name input for autocomplete
  const collegeNameValue = watch('collegeName') || '';
  
  // Mock university database - in a real app, this would come from an API
  const universities = [
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology (MIT)",
    "University of California, Berkeley",
    "University of Oxford",
    "University of Cambridge",
    "California Institute of Technology (Caltech)",
    "University of Chicago",
    "Princeton University",
    "Yale University",
    "Columbia University",
    "Cornell University",
    "University of Pennsylvania",
    "University of Michigan",
    "Johns Hopkins University",
    "ETH Zurich",
    "University of California, Los Angeles (UCLA)",
    "University of Toronto",
    "Imperial College London",
    "New York University (NYU)"
  ];
  
  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0, 0, 0.2, 1.1] }
    }
  };

  // Animation for suggestions dropdown
  const suggestionVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  // Update dropdown position whenever input position changes
  const updateDropdownPosition = () => {
    if (!inputRef.current) return;
    
    const rect = inputRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    // Position below the input by default
    const top = rect.bottom + scrollTop;
    const left = rect.left + scrollLeft;
    
    setDropdownPosition({ 
      top, 
      left, 
      width: rect.width 
    });
  };

  // Listen for scroll and resize to update dropdown position
  useEffect(() => {
    const handlePositionChange = () => {
      if (showSuggestions) {
        updateDropdownPosition();
      }
    };
    
    window.addEventListener('scroll', handlePositionChange, { passive: true });
    window.addEventListener('resize', handlePositionChange);
    
    return () => {
      window.removeEventListener('scroll', handlePositionChange);
      window.removeEventListener('resize', handlePositionChange);
    };
  }, [showSuggestions]);

  // Update position when dropdown visibility changes
  useEffect(() => {
    if (showSuggestions) {
      updateDropdownPosition();
    }
  }, [showSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle institution input change for autocomplete
  useEffect(() => {
    if (collegeNameValue.length > 1) {
      setIsLoading(true);
      
      // Simulating API delay
      const timer = setTimeout(() => {
        const filteredUniversities = universities.filter(uni => 
          uni.toLowerCase().includes(collegeNameValue.toLowerCase())
        );
        setInstitutionSuggestions(filteredUniversities);
        setShowSuggestions(filteredUniversities.length > 0);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setInstitutionSuggestions([]);
      setShowSuggestions(false);
    }
  }, [collegeNameValue]);

  // Handle selection of an institution from suggestions
  const handleInstitutionSelect = (institution) => {
    setValue('collegeName', institution, { shouldValidate: true });
    setShowSuggestions(false);
  };

  // Direct focus to input when clicking on the field container
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Register options with custom ref
  const collegeNameRegister = register('collegeName', { 
    required: 'College/University name is required' 
  });

  // Portal to render dropdown outside of scroll container
 // ...existing code...

  // Portal to render dropdown outside of scroll container
  const SuggestionsDropdown = () => {
    return createPortal(
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            ref={suggestionsRef}
            variants={suggestionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto z-[9999]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: "180px",
            }}
          >
            {institutionSuggestions.map((institution, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-indigo-50 text-sm text-gray-700 border-b border-gray-100 last:border-b-0 truncate"
                onClick={() => handleInstitutionSelect(institution)}
                whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="truncate">{institution}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };
  
return (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={fadeIn}
    className="flex flex-col space-y-6 py-2 relative z-10"
  >
    <motion.div variants={headingVariants}>
        <div className="flex items-center mb-6">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3"
          >
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
            </svg>
          </motion.div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Educational Background</h2>
            <p className="text-sm text-gray-600 mt-1">Tell us about your academic qualifications</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        variants={formContainerVariants}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <motion.div 
          variants={formFieldVariants}
          whileHover={{ 
            scale: 1.01, 
            transition: { duration: 0.2 }
          }}
          className="mb-5"
        >
          <Input
            label="School Name"
            placeholder="Enter your high school name"
            helperText="The name of your high school or secondary education"
            {...register('schoolName', { required: 'School name is required' })}
            error={errors.schoolName}
            className="transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
          />
        </motion.div>
        
        {/* University/College Input with Autocomplete */}
        <motion.div 
          variants={formFieldVariants}
          whileHover={{ 
            scale: 1.01, 
            transition: { duration: 0.2 }
          }}
          className="mb-5"
        >
          <div className="relative" onClick={focusInput}>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
              College/University Name
            </label>
            
            <div className="relative flex">
              <input
                id="collegeName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300
                           transition-all duration-300"
                placeholder="Start typing to see institution suggestions..."
                {...collegeNameRegister}
                ref={(e) => {
                  collegeNameRegister.ref(e);
                  inputRef.current = e;
                }}
                autoComplete="off"
                onFocus={() => {
                  if (institutionSuggestions.length > 0) {
                    setShowSuggestions(true);
                    updateDropdownPosition();
                  }
                }}
              />
              
              {/* Loading spinner or clear button */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5"
                  >
                    <svg className="w-full h-full text-indigo-600" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </motion.div>
                ) : collegeNameValue ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setValue('collegeName', '', { shouldValidate: true });
                      if (inputRef.current) inputRef.current.focus();
                    }}
                  >
                    <svg className="w-5 h-5 text-gray-500 hover:text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ) : null}
              </div>
            </div>
            
            <p className="mt-1 text-xs text-gray-500">The institution where you received your highest degree</p>
            
            {errors.collegeName && (
              <p className="mt-1 text-sm text-red-600">{errors.collegeName.message}</p>
            )}

            {/* Render dropdown through portal */}
            <SuggestionsDropdown />
          </div>
        </motion.div>
        
        <motion.div 
          variants={formFieldVariants}
          whileHover={{ 
            scale: 1.01, 
            transition: { duration: 0.2 }
          }}
          className="mb-2"
        >
          <Input
            label="Degree or Field of Study"
            placeholder="E.g., Bachelor of Science in Computer Science"
            helperText="Your highest qualification or major field of study"
            {...register('degree', { required: 'Degree is required' })}
            error={errors.degree}
            className="transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={formFieldVariants}
        className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 flex items-center mt-1"
      >
        <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-indigo-800">
          Your educational background helps us match you with relevant skill exchange opportunities.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-sm text-gray-500 mt-2"
      >
        <p>All fields are required to proceed to the next step</p>
      </motion.div>
    </motion.div>
  );
};

export default EducationStep;