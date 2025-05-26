import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Input from '../UI/Input';

const PersonalInfoStep = () => {
    const { register, formState: { errors }, watch, setValue, trigger, getValues } = useFormContext();
    const [inputsFocused, setInputsFocused] = useState({
        fullName: false,
        email: false,
        phone: false
    });
    // Get stored country code or default to US
    const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
        const savedCode = getValues('countryCode'); 
        return savedCode || '+1';
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    
    // Create portal container if it doesn't exist
    useEffect(() => {
        if (!document.getElementById('portal-root')) {
            const portalRoot = document.createElement('div');
            portalRoot.id = 'portal-root';
            document.body.appendChild(portalRoot);
        }
        return () => {
            const portalRoot = document.getElementById('portal-root');
            if (portalRoot && portalRoot.childNodes.length === 0) {
                document.body.removeChild(portalRoot);
            }
        };
    }, []);

    // Country codes data with format information
    const countryCodes = [
        { code: '+1', country: '🇺🇸 United States', format: /^\d{10}$/, example: "1234567890" },
        { code: '+44', country: '🇬🇧 United Kingdom', format: /^\d{10}$/, example: "7911123456" },
        { code: '+91', country: '🇮🇳 India', format: /^\d{10}$/, example: "9876543210" },
        { code: '+61', country: '🇦🇺 Australia', format: /^\d{9}$/, example: "412345678" },
        { code: '+86', country: '🇨🇳 China', format: /^\d{11}$/, example: "13123456789" },
        { code: '+49', country: '🇩🇪 Germany', format: /^\d{10,11}$/, example: "1512345678" },
        { code: '+33', country: '🇫🇷 France', format: /^\d{9}$/, example: "612345678" },
        { code: '+81', country: '🇯🇵 Japan', format: /^\d{10}$/, example: "9012345678" },
        { code: '+55', country: '🇧🇷 Brazil', format: /^\d{10,11}$/, example: "11987654321" },
        { code: '+27', country: '🇿🇦 South Africa', format: /^\d{9}$/, example: "821234567" },
        { code: '+7', country: '🇷🇺 Russia', format: /^\d{10}$/, example: "9123456789" },
        { code: '+52', country: '🇲🇽 Mexico', format: /^\d{10}$/, example: "5512345678" },
        { code: '+39', country: '🇮🇹 Italy', format: /^\d{10}$/, example: "3123456789" },
        { code: '+82', country: '🇰🇷 South Korea', format: /^\d{9,10}$/, example: "1012345678" },
        { code: '+34', country: '🇪🇸 Spain', format: /^\d{9}$/, example: "612345678" },
        { code: '+65', country: '🇸🇬 Singapore', format: /^\d{8}$/, example: "91234567" },
    ];

    // Watch inputs to check if they have values
    const fullNameValue = watch('fullName');
    const emailValue = watch('email');
    const phoneValue = watch('phone');
    
    // Set initial countryCode value if not already set
    useEffect(() => {
        if (!getValues('countryCode')) {
            setValue('countryCode', selectedCountryCode);
        }
    }, []);
    
    // Format phone on mount if it exists but isn't formatted
    useEffect(() => {
        const currentPhone = getValues('phone');
        if (currentPhone && /[^\d]/.test(currentPhone)) {
            setValue('phone', formatPhoneNumber(currentPhone));
        }
    }, []);
    
    // Update dropdown position when open
    const updateDropdownPosition = useCallback(() => {
        if (triggerRef.current && isDropdownOpen) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
            
            setDropdownPosition({
                top: rect.bottom + scrollTop,
                left: rect.left + scrollLeft,
                width: rect.width
            });
        }
    }, [isDropdownOpen]);
    
    // Update position on window resize and scroll
    useEffect(() => {
        if (isDropdownOpen) {
            updateDropdownPosition();
            window.addEventListener('scroll', updateDropdownPosition);
            window.addEventListener('resize', updateDropdownPosition);
        }
        
        return () => {
            window.removeEventListener('scroll', updateDropdownPosition);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isDropdownOpen, updateDropdownPosition]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isDropdownOpen &&
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                triggerRef.current && 
                !triggerRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Get selected country format
    const getSelectedCountryFormat = () => {
        const country = countryCodes.find(c => c.code === selectedCountryCode);
        return country || countryCodes[0];
    };

    // Handle country code selection
    const handleCountryCodeSelect = (code) => {
        setSelectedCountryCode(code);
        setValue('countryCode', code); // Update form value
        setIsDropdownOpen(false);
        
        // Re-validate phone when country changes
        if (phoneValue) {
            trigger('phone');
        }
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => {
            const newState = !prev;
            if (newState) {
                // Update position immediately when opening
                setTimeout(updateDropdownPosition, 0);
            }
            return newState;
        });
    };

    // Format phone number on input
    const formatPhoneNumber = (value) => {
        if (!value) return '';
        // Remove all non-digit characters
        return value.replace(/\D/g, '');
    };

    // Handle phone input
    const handlePhoneInput = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setValue('phone', formattedValue);
    };

    // Get formatted phone display
    const getPhoneDisplayFormat = (value) => {
        if (!value) return '';
        const country = getSelectedCountryFormat();
        
        // Return formatted phone based on country
        switch (selectedCountryCode) {
            case '+1': // US
                return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            case '+44': // UK
                return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            // Add more country-specific formats as needed
            default:
                return value;
        }
    };

    // Enhanced animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0, rotate: -20 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            transition: { 
                type: "spring", 
                stiffness: 500, 
                delay: 0.2 
            } 
        }
    };

    const dropdownVariants = {
        closed: { opacity: 0, y: -10, height: 0, overflow: 'hidden' },
        open: { 
            opacity: 1, 
            y: 0, 
            height: 'auto',
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const countryDropdownVariants = {
        closed: { opacity: 0, y: -10, scaleY: 0, transformOrigin: 'top' },
        open: { 
            opacity: 1, 
            y: 0,
            scaleY: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const securityBadgeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                delay: 0.8,
                duration: 0.6 
            }
        },
        hover: { 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
            transition: { duration: 0.2 }
        }
    };

    // Handle focus state for custom placeholder behavior
    const handleFocus = (name) => {
        setInputsFocused(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleBlur = (name) => {
        setInputsFocused(prev => ({
            ...prev,
            [name]: false
        }));
    };

    // Get selected country display
    const getSelectedCountry = () => {
        const country = countryCodes.find(c => c.code === selectedCountryCode);
        return country ? country.country : '🇺🇸 United States';
    };

    // Get phone number validation rules based on selected country
    const getPhoneValidationRules = () => {
        const country = getSelectedCountryFormat();
        return { 
            required: 'Phone number is required',
            pattern: {
                value: country.format,
                message: `Please enter a valid ${country.country.split(' ')[1]} phone number (${country.example.length} digits)`
            },
            onChange: handlePhoneInput,
            setValueAs: formatPhoneNumber // Ensure value is always formatted when set
        };
    };

    // Get remaining digits count for selected country
    const getRemainingDigits = () => {
        if (!phoneValue) return null;
        
        const country = getSelectedCountryFormat();
        const format = country.format.toString();
        let requiredDigits = 10; // Default
        
        // Extract digit requirements from regex pattern
        if (format.includes('{')) {
            const match = format.match(/\{(\d+)(,(\d+))?\}/);
            if (match) {
                requiredDigits = match[3] ? match[3] : match[1];
            }
        }
        
        const remaining = requiredDigits - phoneValue.length;
        return remaining > 0 ? remaining : 0;
    };

    // Portal-based dropdown render
    const CountryDropdown = () => {
        if (!isDropdownOpen) return null;
        
        return createPortal(
            <motion.div
                ref={dropdownRef}
                initial="closed"
                animate="open"
                exit="closed"
                variants={countryDropdownVariants}
                className="fixed bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-40"
                style={{
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                    width: `${dropdownPosition.width}px`
                }}
            >
                {countryCodes.map((country) => (
                    <div 
                        key={country.code}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-50 
                                    ${selectedCountryCode === country.code ? 'bg-blue-50 font-medium' : ''}`}
                        onClick={() => handleCountryCodeSelect(country.code)}
                    >
                        {country.country}
                    </div>
                ))}
            </motion.div>,
            document.getElementById('portal-root')
        );
    };

    return (
     <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col space-y-6 py-2 relative z-50"
        >
            <motion.div 
                variants={itemVariants}
                className="text-center mb-2"
            >
                <motion.div 
                    variants={iconVariants}
                    className="w-16 h-16 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200"
                >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Personal Information</h2>
                <p className="text-gray-600 mt-1 max-w-md mx-auto">
                    Tell us about yourself so we can personalize your experience
                </p>
                <div className="h-1 w-16 bg-blue-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>
            
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl p-6 sm:p-7 shadow-lg border border-gray-100 space-y-5"
            >
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="group"
                >
                    <Input
                        label="Full Name"
                        placeholder={fullNameValue ? "" : "Enter your full name"}
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                        }
                        {...register('fullName', { 
                            required: 'Full name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        })}
                        onFocus={() => handleFocus('fullName')}
                        onBlur={() => handleBlur('fullName')}
                        error={errors.fullName}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-300 group-hover:border-blue-300"
                    />
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="group"
                >
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder={emailValue ? "" : "your.email@example.com"}
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        }
                        {...register('email', { 
                            required: 'Email is required', 
                            pattern: { 
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                                message: 'Invalid email address' 
                            } 
                        })}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        error={errors.email}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-300 group-hover:border-blue-300"
                    />
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="group"
                >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="flex space-x-2">
                        {/* Custom country code dropdown */}
                        <div className="w-1/3 relative">
                            <div
                                ref={triggerRef}
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm 
                                           flex justify-between items-center cursor-pointer hover:border-blue-300 transition-colors"
                                onClick={toggleDropdown}
                            >
                                <span className="text-gray-700 truncate">
                                    {getSelectedCountry()}
                                </span>
                                <svg 
                                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            
                            {/* Hidden form control for react-hook-form */}
                            <input 
                                type="hidden"
                                {...register('countryCode')}
                                value={selectedCountryCode}
                            />
                            
                            {/* Portal-based dropdown */}
                            <AnimatePresence>
                                <CountryDropdown />
                            </AnimatePresence>
                        </div>
                        
                        {/* Phone number input */}
                        <div className="w-2/3">
                            <Input
                                type="tel"
                                placeholder={phoneValue ? "" : "Enter phone number"}
                                leftIcon={
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                }
                                {...register('phone', getPhoneValidationRules())}
                                onFocus={() => handleFocus('phone')}
                                onBlur={() => handleBlur('phone')}
                                error={errors.phone}
                                className="transition-all duration-300 focus:ring-2 focus:ring-blue-300 group-hover:border-blue-300"
                                hideLabel={true}
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                    <motion.div 
                        initial="closed"
                        animate="open"
                        variants={dropdownVariants}
                        className="mt-1"
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                                Example: {getSelectedCountryFormat().example} (digits only)
                            </p>
                            {phoneValue && getRemainingDigits() > 0 && (
                                <p className="text-xs text-blue-500">
                                    {getRemainingDigits()} more digit{getRemainingDigits() !== 1 ? 's' : ''} needed
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-2">
                    <div className="flex items-start gap-3">
                        <input 
                            type="checkbox"
                            id="agreeToTerms"
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 mt-1 focus:ring-blue-500 transition duration-200 ease-in-out"
                            {...register('agreeToTerms', { required: 'You must agree to terms' })} 
                        />
                        <div>
                            <label htmlFor="agreeToTerms" className="text-sm text-gray-700 font-medium">
                                I agree to the Terms and Conditions
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                By checking this box, you agree to our <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                            </p>
                            {errors.agreeToTerms && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.agreeToTerms.message}</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            
            <motion.div 
                variants={securityBadgeVariants}
                whileHover="hover"
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 flex items-center mt-2 shadow-sm transition-all duration-300"
            >
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <motion.svg 
                        className="w-5 h-5 text-blue-600 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            repeat: Infinity, 
                            repeatType: "reverse", 
                            duration: 1.5 
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </motion.svg>
                </div>
                <div>
                    <h3 className="font-medium text-blue-900">Security and Privacy</h3>
                    <p className="text-sm text-blue-800 opacity-90">
                        Your information is secured with 256-bit encryption and will only be used to personalize your experience.
                    </p>
                </div>
            </motion.div>
            
            <motion.div 
                variants={itemVariants}
                className="flex justify-center"
            >
                <motion.button
                    type="button"
                    className="text-sm text-gray-600 hover:text-blue-600 flex items-center focus:outline-none transition duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Why do we need this information?
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default PersonalInfoStep;
