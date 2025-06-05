"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import { cn } from "../../../../libs/utils";

export default function NavTabs({ tabs, setLoaded }) {

  const location = useLocation();
  
  // setLoaded is used to show a loading indicator during page transitions

  const [selected, setSelected] = useState(tabs[0]);
  
  // Use useEffect to update the selected tab whenever the location changes
  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    
    // Map the current path to the corresponding tab
    let matchingTab;
    if (currentPath === "" || currentPath === "home") {
      matchingTab = "Home";
    } else if (currentPath === "about") {
      matchingTab = "About";
    } else if (currentPath === "connect") {
      matchingTab = "Connect";
    } else if (currentPath === "contact") {
      matchingTab = "Contact Us";
    } else if (currentPath === "profile") {
      matchingTab = "Profile";
    } else {
      matchingTab = tabs[0]; // Default fallback
    }
    
    if (matchingTab && matchingTab !== selected) {
      setSelected(matchingTab);
    }
  }, [location.pathname, tabs, selected]);

  return (
    <nav className="flex items-center justify-center w-full fixed top-4 left-0 right-0 z-50">
      <div className="flex items-center rounded-lg bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-1">
        {tabs.map((tab) => (
          <Tab
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            setLoaded={setLoaded}
            key={tab}
          />
        ))}
      </div>
    </nav>
  );
}

const Tab = ({ text, selected, setSelected, setLoaded }) => {
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    try {
      // First set the loading state to true if the function exists
      if (typeof setLoaded === 'function') {
        console.log("Setting loading state to true before navigation");
        setLoaded(true);
      }
      
      // Get the path based on the tab text
      let path = text.toLowerCase().replace(/\s+/g, "-");
      
      // Handle special cases
      if (text === "Home") {
        path = "/";
      } else if (text === "Contact Us") {
        path = "/contact";
      } else {
        path = `/${path}`;
      }
      
      console.log(`Navigating to: ${path}`);
      
      // Update the selected state immediately for visual feedback
      setSelected(text);
      
      // Navigate to the new route
      navigate(path);
      
      // Add a small delay before setting loaded to false to allow for route change
      setTimeout(() => {
        if (typeof setLoaded === 'function') {
          console.log("Setting loading state to false after navigation delay");
          setLoaded(false);
        }
      }, 100); // Short delay to ensure route change has started
      
    } catch (error) {
      console.error("Error during navigation:", error);
      // Reset loading state on error
      if (typeof setLoaded === 'function') {
        setLoaded(false);
      }
    }
  }
  
  // Calculate minimum width based on text length to prevent shifting
  const getMinWidth = (text) => {
    const baseWidth = 60;
    const charWidth = 8;
    return Math.max(baseWidth, text.length * charWidth + 24);
  };

  return (
    <button
      onClick={handleClick}
      style={{ minWidth: `${getMinWidth(text)}px` }}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-150 ease-in-out",
        "flex items-center justify-center whitespace-nowrap rounded-md",
        "h-9", // Fixed height
        selected 
          ? "text-white" 
          : "text-slate-300 hover:text-white"
      )}
    >
      <span className="relative z-20 pointer-events-none">{text}</span>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md"
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export { Tab };