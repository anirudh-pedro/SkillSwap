import React from 'react'
import NavTabs from './mage-ui/container/nav-tabs'

const Navbar = ({setLoaded}) => {
  // setLoaded is used to show a loading indicator during page transitions
  
  return (
    <div className="flex items-center justify-center">
      <NavTabs 
        setLoaded={setLoaded} 
        tabs={['Home', 'Connect', 'About', 'Contact Us', 'Profile']} 
      />
    </div>
  )
}

export default Navbar