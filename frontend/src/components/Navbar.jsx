import React from 'react'
import NavTabs from './mage-ui/container/nav-tabs'

const Navbar = () => {
  return (
    <>
      <NavTabs tabs={['Home', 'Connect', 'Settings',"Contact Us", 'Profile']} />
    </>
  )
}

export default Navbar