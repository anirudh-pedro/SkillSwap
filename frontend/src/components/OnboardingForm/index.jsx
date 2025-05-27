import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormButtons from './FormButton';

import PersonalInfoStep from './PersonalInfoStep';
import EducationStep from './EducationStep';
import InterestsStep from './InterestsStep';
import SkillsStep from './SkillsStep';
import ConfirmationStep from './ConfirmationStep';
import ProgressBar from './ProgressBar';

// Form validation schemas (unchanged)
const schema = yup.object().shape({
  // Personal info validation
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  
  // Education validation
  schoolName: yup.string().required('School name is required'),
  collegeName: yup.string().required('College/University name is required'),
  degree: yup.string().required('Degree is required'),
  
  // Interests validation
  jobTitle: yup.string(),
  areasOfInterest: yup.string().required('Areas of interest are required'),
  
  // Skills validation
  skillsToTeach: yup.array().min(1, 'Add at least one skill you can teach'),
  skillsToLearn: yup.array().min(1, 'Add at least one skill you want to learn'),
});

// Direction enum to track animation direction
const DIRECTIONS = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
};

const OnboardingForm = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(DIRECTIONS.FORWARD);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const contentRef = React.useRef(null);
  
  // Add ref to track the form container for positioning
  const formContainerRef = React.useRef(null);
  
  // Define navbar height constant
  const NAVBAR_HEIGHT = 70; // Adjust based on your actual navbar height

  // Form methods setup
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      agreeToTerms: false,
      marketingOptIn: false,
      schoolName: '',
      collegeName: '',
      degree: '',
      jobTitle: '',
      areasOfInterest: '',
      skillsToTeach: [],
      skillsToLearn: [],
      willingToTeach: false,
      willingToLearn: false
    }
  });
  
  const { handleSubmit, trigger, formState, watch, setValue } = methods;
  
  // Fix for refresh issue - load saved step from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem('onboardingStep');
    if (savedStep !== null) {
      setStep(parseInt(savedStep, 10));
    }
    
    // Load saved form data
    const savedFormData = localStorage.getItem('onboardingFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        Object.entries(parsedData).forEach(([key, value]) => {
          setValue(key, value);
        });
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
    
    // Ensure initial positioning below navbar
    ensureFormBelowNavbar();
    
    // Add scroll event listener to handle navbar overlap
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setValue]);
  
  // Ensure the form is properly positioned below the navbar
  const ensureFormBelowNavbar = () => {
    if (formContainerRef.current) {
      const rect = formContainerRef.current.getBoundingClientRect();
      if (rect.top < NAVBAR_HEIGHT) {
        window.scrollTo({
          top: window.scrollY + (NAVBAR_HEIGHT - rect.top) + 20, // Add 20px extra space
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Handle scroll to ensure form remains properly positioned
  const handleScroll = () => {
    if (formContainerRef.current) {
      const rect = formContainerRef.current.getBoundingClientRect();
      
      // Add safe-area class to form if it's too close to the navbar
      if (rect.top < NAVBAR_HEIGHT) {
        formContainerRef.current.classList.add('pushed-below-navbar');
      } else {
        formContainerRef.current.classList.remove('pushed-below-navbar');
      }
    }
  };

  // Save current step to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('onboardingStep', step.toString());
    
    // Reset scroll position on step change
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    
    // Ensure proper positioning when changing steps
    ensureFormBelowNavbar();
  }, [step]);
  
  // Save form data to localStorage when it changes
  const watchAllFields = watch();
  useEffect(() => {
    const data = JSON.stringify(watchAllFields);
    localStorage.setItem('onboardingFormData', data);
  }, [watchAllFields]);
  
  // Navigation functions
  const nextStep = async () => {
    // For the last step, we don't need to validate
    if (step === steps.length - 1) {
      return;
    }
    
    // Determine which fields to validate based on current step
    let fieldsToValidate = [];
    switch (step) {
      case 0: // Personal info
        fieldsToValidate = ['fullName', 'email', 'phone', 'agreeToTerms'];
        break;
      case 1: // Education
        fieldsToValidate = ['schoolName', 'collegeName', 'degree'];
        break;
      case 2: // Interests
        fieldsToValidate = ['areasOfInterest'];
        break;
      case 3: // Skills
        fieldsToValidate = ['skillsToTeach', 'skillsToLearn'];
        break;
      default:
        break;
    }
    
    // Validate the current step's fields
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setDirection(DIRECTIONS.FORWARD);
      setStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    setDirection(DIRECTIONS.BACKWARD);
    setStep(prev => Math.max(0, prev - 1));
  };
  
  // Define steps components - adding NavbarContext to each step
  const steps = [
    <PersonalInfoStep key="personal" />,
    <EducationStep key="education" navbarHeight={NAVBAR_HEIGHT} />,
    <InterestsStep key="interests" />,
    <SkillsStep key="skills" />,
    <ConfirmationStep key="confirmation" />
  ];
  
  const onSubmit = async data => {
    try {
      setIsLoading(true);
      console.log('Form submitted with:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear localStorage after successful submission
      localStorage.removeItem('onboardingStep');
      localStorage.removeItem('onboardingFormData');
      
      setIsSubmitSuccess(true);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: (direction) => ({
      x: direction === DIRECTIONS.FORWARD ? '30%' : '-30%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction === DIRECTIONS.FORWARD ? '-30%' : '30%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  // Container reveal animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  // Success screen animation
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2
      }
    }
  };
  
  return (
    <motion.div
      ref={formContainerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full onboarding-form-container mt-20 pt-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 min-h-screen text-slate-100" // Added text-slate-100 for light text
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-800 text-slate-100"> {/* Added text-slate-100 */}
          <div className="px-4 py-5 sm:px-8">
            {isSubmitSuccess ? (
              // Success state
              <motion.div 
                className="py-10 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Registration Complete!</h2> {/* Changed to text-slate-100 */}
                <p className="text-slate-300 mb-6 max-w-md mx-auto">
                  Thank you for joining our skill exchange community. Your profile has been created successfully.
                </p>
                <button 
                  type="button"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.href = "/"}
                >
                  Go to Dashboard
                </button>
              </motion.div>
            ) : (
              // Form state
              <>
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-50">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-100 mb-1">
                    Join Our Skill Swap Community
                  </h1>
                  <p className="text-slate-300 text-base mx-auto">
                    Connect with others who want to teach and learn new skills.
                  </p>
                </motion.div>
                
                <ProgressBar currentStep={step} totalSteps={steps.length} />
                
                {/* Scrollable content area */}
                <div 
                  ref={contentRef}
                  className="form-content-wrapper relative overflow-y-auto pb-4 rounded-lg mb-4"
                  style={{ 
                    maxHeight: "450px",
                    minHeight: "450px", 
                    scrollbarWidth: "thin",
                    scrollbarColor: "#CBD5E0 #F7FAFC",
                    position: "relative", // Ensures proper stacking context
                    zIndex: 10 // Lower than navbar but high enough for most content
                  }}
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full pb-4 px-1"
                    >
                      {steps[step]}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Subtle scroll indicator at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div> {/* Changed to from-slate-900 */}
                </div>
                
                {/* Fixed position buttons outside the scrolling area */}
                <div className="py-2 border-t border-slate-800">
                  <FormButtons 
                    onNext={nextStep}
                    onBack={prevStep}
                    isFirstStep={step === 0}
                    isLastStep={step === steps.length - 1}
                    isLoading={isLoading}
                  />
                </div>
              </>
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-900 p-4 text-center border-t border-slate-800"
          >
            <p className="text-xs text-slate-400">
              All information provided is securely stored and handled according to our{" "}
              <a href="#" className="text-cyan-400 hover:underline font-medium">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </form>
      </FormProvider>
      
      {/* Scrollbar styling and navbar overlap prevention */}
      <style jsx global>{`
        /* Ensure navbar has higher z-index than any form elements */
        nav, header {
          z-index: 50 !important;
          position: relative;
        }
        
        /* Form pushed below navbar class */
        .pushed-below-navbar {
          margin-top: ${NAVBAR_HEIGHT + 20}px !important;
          transition: margin-top 0.2s ease;
        }
        
        /* Portal container for dropdowns */
        #portal-root {
          position: fixed;
          z-index: 40;
          top: 0;
          left: 0;
          width: 100%;
        }
        
        /* Scrollbar styling */
        .form-content-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        .form-content-wrapper::-webkit-scrollbar-track {
          background: #F7FAFC;
        }
        .form-content-wrapper::-webkit-scrollbar-thumb {
          background-color: #CBD5E0;
          border-radius: 6px;
        }
        
        /* Safari and Chrome scrollbar styling */
        .form-content-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #CBD5E0 #F7FAFC;
        }
        
        /* Ensure the container allows proper scrolling */
        .form-content-wrapper > div {
          position: relative !important;
          height: auto !important;
        }
        
        /* Ensure the confirmation step is fully visible */
        .form-content-wrapper .space-y-5,
        .form-content-wrapper .space-y-6 {
          padding-bottom: 20px;
        }
        
        /* Style for autocomplete dropdown containers */
        .dropdown-portal {
          position: fixed;
          z-index: 45; /* Higher than form content but lower than navbar */
        }
      `}</style>
    </motion.div>
  );
};

export default OnboardingForm;