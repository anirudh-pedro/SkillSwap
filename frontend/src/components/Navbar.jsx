import React from 'react'
import NavTabs from './mage-ui/container/nav-tabs'

const Navbar = ({setLoaded}) => {
  // setLoaded is used to show a loading indicator during page transitions
  
  return (
    <>
      <NavTabs setLoaded={setLoaded} tabs={['Home', 'Connect', 'About',"Contact Us", 'Profile']} />
    </>
  )
}

export default Navbar