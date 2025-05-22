import React from 'react';

const Loader = () => {
  console.log("Rendering Loader component");
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
    </div>
  );
};

export default Loader;