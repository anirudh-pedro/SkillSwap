// import React, { useState, useEffect } from 'react'
// import { Outlet } from 'react-router-dom'
// import Nav from '../components/Nav'
// import Loader from '../components/Loader'
// // import { ScatterBoxLoaderComponent } from '../components/ScatterBoxLoaderComponent'

// function Layout() {
//   const [loading, setLoading] = useState(false);
  
//   // Add a small delay to make the loader visible
//   useEffect(() => {
//     if (loading) {
//       console.log("Loading state activated, showing loader");
//       const timer = setTimeout(() => {
//         console.log("Timer completed, hiding loader");
//         setLoading(false);
//       }, 800); // Show loader for 800ms
      
//       return () => clearTimeout(timer);
//     }
//   }, [loading]);
  
//   console.log("Layout rendering, loading state:", loading);
  
//   return (
//     <div className='bg-gray-900 min-h-screen flex flex-col'>
//         {loading && <Loader />}
//         {/* <Nav setLoaded={setLoading} /> */}
//         <Outlet />
//     </div>
//   )
// }

// export default Layout
import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Loader from '../components/Loader'
// import { ScatterBoxLoaderComponent } from '../components/ScatterBoxLoaderComponent'

function Layout() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  // Pages where Nav should be shown
  const showNavOn = ['/', '/home', '/about', '/userdetails', '/profile', '/connect', '/contact'];
  
  // Check if current path should have Nav
  const shouldShowNav = showNavOn.includes(location.pathname);
  
  // Add a small delay to make the loader visible
  useEffect(() => {
    if (loading) {
      console.log("Loading state activated, showing loader");
      const timer = setTimeout(() => {
        console.log("Timer completed, hiding loader");
        setLoading(false);
      }, 800); // Show loader for 800ms
      
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  console.log("Layout rendering, loading state:", loading);
  
  return (
    <div className='bg-gray-900 min-h-screen flex flex-col'>
        {loading && <Loader />}
        {shouldShowNav && <Nav setLoaded={setLoading} />}
        <Outlet />
    </div>
  )
}

export default Layout