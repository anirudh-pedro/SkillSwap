"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import { cn } from "../../../../libs/utils";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NavTabs({ tabs, setLoaded }: { tabs: string[]; setLoaded: React.Dispatch<React.SetStateAction<boolean>> }) {

  const location = useLocation();
  
  // setLoaded is used to show a loading indicator during page transitions

  const [selected, setSelected] = useState<string>(tabs[0]);
  
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
      // Try to find a matching tab based on the path
      matchingTab = tabs.find(tab => 
        tab.toLowerCase().replace(/\s+/g, "-") === currentPath
      );
    }
    
    if (matchingTab) {
      setSelected(matchingTab);
    }
    
    console.log("Current path:", currentPath, "Matching tab:", matchingTab);
  }, [location.pathname, tabs]);

  console.log("tabs", tabs);
  console.log("selected", selected);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-md bg-transparent p-6">
      {tabs.map((tab) => (
        <Tab text={tab} setLoaded={setLoaded} selected={selected === tab} setSelected={setSelected} key={tab} />
      ))}
      
    </div>
  );
}

const Tab = ({ text, selected, setSelected, setLoaded }: TabProps) => {
  
  const navigate = useNavigate();
  // removes leading "/"
  
  // setLoaded is used to show a loading indicator during page transitions

  const handleClick = () => {
    try {
      // First set the loading state to true if the function exists
      if (typeof setLoaded === 'function') {
        console.log("Setting loading state to true before navigation");
        setLoaded(true);
      }
      
      // Get the path based on the tab text
      let path = text.toLowerCase().replace(/\s+/g, "-");
      
      // Special case for "Home" tab - navigate to "/home" instead of "/"
      if (path === "home") {
        path = "/home";
      } else if (path === "contact-us") {
        // Handle "Contact Us" tab
        path = "/contact";
      } else if (path === "connect") {
        // Handle "Connect" tab
        path = "/connect";
      } else if (path === "profile") {
        // Handle "Profile" tab
        path = "/profile";
      } else {
        path = `/${path}`;
      }
      
      console.log("Navigating to:", path);
      
      // Use a small timeout to ensure the loading state is set before navigation
      // This helps ensure the loader is visible
      setTimeout(() => {
        // Navigate to the new page
        navigate(path);
      }, 50);
    } catch (error) {
      console.error("Error in handleClick:", error);
      // If there's an error, make sure to reset the loading state
      if (typeof setLoaded === 'function') {
        setLoaded(false);
      }
    }
  }
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative rounded-md p-2 text-sm transition-all bg-transparent",
        selected ? "text-white" : "text-slate-300 hover:font-black",
      )}
    >
      <p className=" relative text-white z-50 min-w-20">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-indigo-600 to-pink-600"
        />
      )}
    </button>
  );
};
export { Tab };