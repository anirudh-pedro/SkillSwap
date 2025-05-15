import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Profile from './Profile'

const Nav = () => {
  return (
    <>
        <div className='h-20 w-full flex justify-around '>
            <Logo />
            <Navbar />
            <Profile />
        </div>
    </>
  )
}

export default Nav