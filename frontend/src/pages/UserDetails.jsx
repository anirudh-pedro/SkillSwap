import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingForm from '../components/OnboardingForm';

const UserDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Shorter loading delay for better experience
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    // Refined animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.12
            }
        },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    // Content animation with subtle lift effect
    const contentVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        }
    };

    return (
        // Changed to dark gradient background
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-16">
            <AnimatePresence>
                {isLoaded && (
                    <motion.div
                        className="w-full" // Full width container
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Sleek header with integrated title - full width with adjusted positioning */}
                        <motion.div 
                            className="bg-slate-900 border-b border-slate-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8 mb-6"
                            variants={contentVariants}
                        >
                            <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center mb-1">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 shadow-lg">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-100 ml-3">SkillSwap</h2>
                                    </div>
                                    <p className="text-sm text-slate-400 ml-1">
                                        Complete your profile to start connecting with the community.
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">How it works</a>
                                    <a href="#" className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-700 shadow-sm transition-colors">
                                        Skip to Dashboard
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Main content area with extra wide layout */}
                        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Main form column - takes more space */}
                                <motion.div 
                                    className="lg:col-span-10 bg-slate-900 shadow-xl rounded-xl overflow-hidden border border-slate-800"
                                    variants={contentVariants}
                                >
                                    {/* Enhanced header with gradient - more compact */}
                                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 px-6 py-3 flex items-center">
                                        <div className="bg-white/20 rounded-full p-2">
                                            <svg 
                                                className="w-5 h-5 text-white" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h1 className="text-lg font-semibold text-white">Profile Setup</h1>
                                            <p className="text-cyan-100 text-xs">5-minute process to complete</p>
                                        </div>
                                    </div>
                                    
                                    {/* Form container - wider and shorter */}
                                    <div className="px-6 py-5 md:px-8 lg:px-10">
                                        {/* Override OnboardingForm styles for width and height */}
                                        <style jsx global>{`
                                            .onboarding-form-container {
                                                padding: 0 !important;
                                                max-width: 100% !important;
                                            }
                                            .onboarding-form-container form {
                                                box-shadow: none !important;
                                                border: none !important;
                                                padding: 0 !important;
                                            }
                                            .onboarding-form-container .min-h-[450px] {
                                                min-height: 350px !important;
                                            }
                                        `}</style>
                                        <OnboardingForm />
                                    </div>
                                </motion.div>
                                
                                {/* Sidebar with benefits and information - takes less space */}
                                <motion.div 
                                    className="lg:col-span-2 space-y-4"
                                    variants={contentVariants}
                                >
                                    {/* Community stats - more compact */}
                                    <div className="bg-slate-900 shadow-lg rounded-xl p-4 border border-slate-800">
                                        <h3 className="text-sm font-semibold text-slate-100 mb-3">Community Stats</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { label: 'Active Users', value: '12,580+' },
                                                { label: 'Skills Shared', value: '8,350+' },
                                                { label: 'Success Rate', value: '94%' }
                                            ].map((stat, index) => (
                                                <div key={index} className="text-center p-2 rounded-lg bg-slate-800">
                                                    <p className="text-base font-bold text-cyan-400">{stat.value}</p>
                                                    <p className="text-xs text-slate-400">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Why complete your profile section - more compact */}
                                    <div className="bg-slate-900 shadow-lg rounded-xl p-4 border border-slate-800">
                                        <h3 className="text-sm font-semibold text-slate-100 mb-3">Why Complete Profile?</h3>
                                        <ul className="space-y-2">
                                            {[
                                                { text: 'Find matching partners', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                                                { text: 'Get recommendations', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                                                { text: 'Unlock all features', icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z' },
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg className="w-4 h-4 text-green-400 mr-1 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                    </svg>
                                                    <span className="text-slate-200 text-xs">{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Feature highlights in a more spaced-out layout */}
                            <motion.div 
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
                                variants={contentVariants}
                            >
                                {/* Feature cards remain unchanged */}
                                {
                                    [{ 
                                        title: 'Verify Skills', 
                                        text: 'Get verified by peers & experts', 
                                        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                                        color: 'cyan'
                                    },
                                    { 
                                        title: 'Connect with Peers', 
                                        text: 'Find complementary skills', 
                                        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                                        color: 'blue'
                                    },
                                    { 
                                        title: 'Learn & Teach', 
                                        text: 'Exchange knowledge & grow', 
                                        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                                        color: 'purple'
                                    },
                                    { 
                                        title: 'Track Progress', 
                                        text: 'Monitor your learning journey', 
                                        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                                        color: 'emerald'
                                    }
                                    ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className={`bg-slate-900 shadow-md rounded-xl p-3 border border-slate-800 hover:shadow-lg transition-all duration-300`}
                                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                    >
                                        <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-${item.color}-900 mb-2`}>
                                            <svg className={`w-4 h-4 text-${item.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-100 mb-0.5">{item.title}</h3>
                                        <p className="text-slate-400 text-xs">{item.text}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                            
                            {/* Footer with trust indicators - more compact */}
                            <motion.div 
                                className="mt-6 text-center border-t border-slate-800 pt-4 pb-6 mb-4"
                                variants={contentVariants}
                            >
                                <p className="text-xs text-slate-500 mb-2">Trusted by professionals worldwide</p>
                                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                                    {['Microsoft', 'Google', 'Amazon', 'LinkedIn', 'Adobe', 'Salesforce'].map((company) => (
                                        <span key={company} className="text-slate-600 font-medium text-xs">{company}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Enhanced loading state with logo animation - adjusted for navbar */}
            {!isLoaded && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="relative flex items-center justify-center">
                        {/* Outer spinning ring */}
                        <div className="h-16 w-16 rounded-full border-3 border-t-cyan-600 border-r-transparent border-b-cyan-400 border-l-transparent animate-spin"></div>
                        
                        {/* Inner element */}
                        <div className="absolute">
                            <div className="h-10 w-10 bg-cyan-600 rounded-lg flex items-center justify-center animate-pulse">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-400 font-medium animate-pulse text-sm">Loading your profile...</p>
                </div>
            )}
        </div>
    );
};

export default UserDetails;