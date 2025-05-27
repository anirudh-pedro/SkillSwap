import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

const ConfirmationStep = () => {
  const { watch } = useFormContext();
  const formData = watch();
  
  // Animation variants for staggered children
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

  // Format skills with count for summary display
  const skillsToTeachCount = formData.skillsToTeach?.length || 0;
  const skillsToLearnCount = formData.skillsToLearn?.length || 0;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-5 pb-2 flex flex-col py-2 relative z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 min-h-screen text-slate-100"
    >
      <div className="text-center pb-2">
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-900">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-slate-100">
          Almost Done!
        </motion.h2>
        <motion.p variants={itemVariants} className="text-slate-300 mt-1">
          Please review your profile information before submitting
        </motion.p>
      </div>
      
      {/* Profile summary card */}
      <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-700 px-4 py-3">
          <h3 className="text-white font-medium text-lg">Your Profile Summary</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {/* Personal Section */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="h-7 w-7 rounded-full bg-blue-800 flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-100">Personal Information</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pl-9">
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Full Name</span>
                <p className="font-medium text-slate-100 truncate">{formData.fullName || "—"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Email Address</span>
                <p className="font-medium text-slate-100 truncate">{formData.email || "—"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Phone Number</span>
                <p className="font-medium text-slate-100 truncate">{formData.phone || "—"}</p>
              </div>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="h-7 w-7 rounded-full bg-indigo-800 flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-100">Educational Background</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pl-9">
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">School</span>
                <p className="font-medium text-slate-100 truncate">{formData.schoolName || "—"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">College/University</span>
                <p className="font-medium text-slate-100 truncate">{formData.collegeName || "—"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Degree</span>
                <p className="font-medium text-slate-100 truncate">{formData.degree || "—"}</p>
              </div>
            </div>
          </div>
          
          {/* Professional Section */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="h-7 w-7 rounded-full bg-purple-800 flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-100">Professional Interests</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pl-9">
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Current Role</span>
                <p className="font-medium text-slate-100 truncate">{formData.jobTitle || "Not provided"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Areas of Interest</span>
                <p className="font-medium text-slate-100 truncate">{formData.areasOfInterest || "—"}</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Teaching Status</span>
                <p className="font-medium">
                  {formData.willingToTeach 
                    ? <span className="text-green-400">Willing to teach</span> 
                    : <span className="text-slate-500">Not interested in teaching</span>}
                </p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400">Learning Status</span>
                <p className="font-medium">
                  {formData.willingToLearn 
                    ? <span className="text-green-400">Looking to learn</span> 
                    : <span className="text-slate-500">Not interested in learning</span>}
                </p>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="h-7 w-7 rounded-full bg-emerald-800 flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-100">Skills Exchange</h4>
            </div>
            <div className="space-y-3 text-sm pl-9">
              <div className="bg-blue-900/40 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-200">Skills to Teach</span>
                  <span className="bg-blue-800 text-blue-200 text-xs px-2 py-0.5 rounded-full">
                    {skillsToTeachCount} {skillsToTeachCount === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillsToTeachCount > 0 ? (
                    formData.skillsToTeach.map(skill => (
                      <span key={skill} className="bg-slate-800 text-blue-200 border border-blue-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No skills added</span>
                  )}
                </div>
              </div>
              
              <div className="bg-emerald-900/40 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-emerald-200">Skills to Learn</span>
                  <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded-full">
                    {skillsToLearnCount} {skillsToLearnCount === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillsToLearnCount > 0 ? (
                    formData.skillsToLearn.map(skill => (
                      <span key={skill} className="bg-slate-800 text-emerald-200 border border-emerald-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No skills added</span>
                  )}
                </div>
              </div>
              
              {formData.documents?.length > 0 && (
                <div className="bg-slate-800 p-3 rounded">
                  <span className="font-medium text-slate-200">Documents Uploaded</span>
                  <p className="text-slate-400 mt-1">
                    {formData.documents.length} {formData.documents.length === 1 ? 'file' : 'files'} successfully uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-blue-900/40 rounded-lg p-4 border border-blue-800 flex items-center">
        <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-200">
          By submitting this form, you're ready to join our skill exchange community and start connecting with others.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationStep;