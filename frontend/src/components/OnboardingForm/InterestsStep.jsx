import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import Input from '../UI/Input';

const InterestsStep = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col space-y-6 py-2 relative z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 min-h-screen text-slate-100"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-6">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-3"
          >
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </motion.div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Professional Interests</h2>
            <p className="text-sm text-slate-300 mt-1">Tell us about your career and interests</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        className="bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-800 space-y-5"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <Input
            label="Current Job Title"
            placeholder="E.g., Software Engineer, Product Manager"
            helperText="Your current role or position (optional)"
            {...register('jobTitle')}
            error={errors.jobTitle}
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-400 text-slate-100 bg-slate-800 border-slate-700"
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <label className="block text-slate-200 text-sm font-medium mb-2">
            Areas of Interest
          </label>
          <textarea
            placeholder="E.g., Web Development, Digital Marketing, Graphic Design"
            className="w-full px-3 py-2 placeholder-slate-400 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-slate-100 bg-slate-800"
            rows="4"
            {...register('areasOfInterest', { required: 'Areas of interest are required' })}
          ></textarea>
          <p className="text-xs text-slate-400 mt-1">List your professional interests, separated by commas</p>
          {errors.areasOfInterest && (
            <p className="text-red-400 text-xs mt-1">{errors.areasOfInterest.message}</p>
          )}
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col space-y-4 pt-2">
          <div className="flex items-start gap-3">
            <input 
              type="checkbox"
              id="willingToTeach"
              className="h-5 w-5 text-purple-500 rounded border-slate-700 mt-1"
              {...register('willingToTeach')} 
            />
            <div>
              <label htmlFor="willingToTeach" className="text-sm text-slate-200 font-medium">
                I am willing to teach others
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Check this if you're willing to share your knowledge and skills
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <input 
              type="checkbox"
              id="willingToLearn"
              className="h-5 w-5 text-purple-500 rounded border-slate-700 mt-1"
              {...register('willingToLearn')} 
            />
            <div>
              <label htmlFor="willingToLearn" className="text-sm text-slate-200 font-medium">
                I am looking to learn from others
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Check this if you want to gain knowledge and skills from others
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-purple-900/30 rounded-lg p-4 border border-purple-800 flex items-center"
      >
        <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="text-sm text-purple-100">
          Your professional interests help us create better skill-sharing matches for you.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default InterestsStep;