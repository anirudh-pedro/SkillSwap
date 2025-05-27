import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Profile from './Profile'

const Nav = ({setLoaded}) => {
  // setLoaded is used to show a loading indicator during page transitions
  
  return (
    <>
        <div className='z-50 sticky top-0 left-0 w-full flex justify-around text-white items-center align-middle backdrop-blur-md bg-black/20 border-b-2 border-white/10'>
            <Logo />
            <Navbar 
              setLoaded={setLoaded}             
            />
            <Profile />
        </div>
    </>
  )
}

export default Nav