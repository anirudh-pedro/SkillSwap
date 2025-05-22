import React from 'react'
import NavTabs from './mage-ui/container/nav-tabs'

const Navbar = () => {
  return (
    <>
      <NavTabs tabs={['Home', 'Connect', 'About',"Contact Us", 'Profile']} />
    </>
  )
}

export default Navbar