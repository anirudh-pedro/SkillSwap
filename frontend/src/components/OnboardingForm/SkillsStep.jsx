import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const TagInput = ({ label, value = [], onChange, error, skillType, ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Color scheme based on skill type
  const colorScheme = skillType === 'teach' 
    ? { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', tagBg: 'bg-blue-100' }
    : { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200', tagBg: 'bg-green-100' };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        const newValue = [...value, inputValue.trim()];
        onChange(newValue);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    const newValue = value.filter(tag => tag !== tagToRemove);
    onChange(newValue);
  };

  // Animation variants for tags
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="relative mb-5">
      <div className={`p-4 rounded-lg ${colorScheme.bg} border ${error ? 'border-red-300' : colorScheme.border}`}>
        <label className={`block ${colorScheme.text} font-medium mb-2`}>
          {label}
        </label>
        
        {/* Tags container */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
          <AnimatePresence mode="popLayout">
            {value.map(tag => (
              <motion.div
                key={tag}
                layout
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${colorScheme.tagBg} ${colorScheme.text} px-3 py-1.5 rounded-full flex items-center text-sm`}
              >
                {tag}
                <button 
                  type="button"
                  className="ml-2 h-5 w-5 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/60 transition-colors"
                  onClick={() => removeTag(tag)}
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Input field with focused animation */}
        <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`appearance-none border bg-white
              ${error ? 'border-red-300' : 'border-gray-300'}
              rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight
              focus:outline-none`}
            placeholder="Type skill and press Enter or comma to add"
            {...props}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                if (!value.includes(inputValue.trim())) {
                  onChange([...value, inputValue.trim()]);
                }
                setInputValue('');
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              +
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 ml-1"
        >
          {error.message}
        </motion.p>
      )}
      
      {value.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`absolute -top-2 right-2 ${colorScheme.tagBg} ${colorScheme.text} text-xs px-2 py-0.5 rounded-full`}
        >
          {value.length} {value.length === 1 ? 'skill' : 'skills'}
        </motion.div>
      )}
    </div>
  );
};

const SkillsStep = () => {
  const { register, setValue, watch, formState: { errors }, trigger } = useFormContext();
  const skillsToTeach = watch('skillsToTeach') || [];
  const skillsToLearn = watch('skillsToLearn') || [];
  const [willingToTeach, setWillingToTeach] = useState(false);
  const [willingToLearn, setWillingToLearn] = useState(false);

  // Register the skills fields with validation
  React.useEffect(() => {
    register('skillsToTeach', { 
      required: 'Please add at least one skill you can teach' 
    });
    register('skillsToLearn', { 
      required: 'Please add at least one skill you want to learn' 
    });
    register('willingToTeach');
    register('willingToLearn');
  }, [register]);

  // Update willing states
  React.useEffect(() => {
    setValue('willingToTeach', willingToTeach);
    setValue('willingToLearn', willingToLearn);
  }, [willingToTeach, willingToLearn, setValue]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center pb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-50">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Skills Exchange</h2>
        <p className="text-gray-600 mt-1">Share what you can teach and what you want to learn</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <TagInput
          label="Skills You Can Teach Others"
          value={skillsToTeach}
          onChange={(newValue) => setValue('skillsToTeach', newValue, { shouldValidate: true })}
          error={errors.skillsToTeach}
          skillType="teach"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <TagInput
          label="Skills You Want to Learn"
          value={skillsToLearn}
          onChange={(newValue) => setValue('skillsToLearn', newValue, { shouldValidate: true })}
          error={errors.skillsToLearn}
          skillType="learn"
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg border ${willingToTeach ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
          onClick={() => setWillingToTeach(!willingToTeach)}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-2 ${willingToTeach ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
              {willingToTeach && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`font-medium ${willingToTeach ? 'text-blue-800' : 'text-gray-700'}`}>I'm willing to teach others</span>
          </div>
        </div>

        <div className={`p-3 rounded-lg border ${willingToLearn ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
          onClick={() => setWillingToLearn(!willingToLearn)}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-2 ${willingToLearn ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
              {willingToLearn && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`font-medium ${willingToLearn ? 'text-green-800' : 'text-gray-700'}`}>I'm looking to learn from others</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-gray-700 font-medium mb-2">
          Supporting Documents (Optional)
        </label>
        <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 text-center">
          <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-500 mb-2">Drag & drop files or</p>
          <label className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
            Browse Files
            <input
              type="file"
              className="hidden"
              multiple
              {...register('documents')}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Upload certifications, portfolios or any other relevant documents
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsStep;