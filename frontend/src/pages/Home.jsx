import React from 'react'
import Spline from '../components/spline'
import HomeLeft from '../components/HomeLeft'
import { Outlet } from 'react-router-dom'
import HomeRight from '../components/HomeRight'
import CanvasCursor from '../components/mage-ui/cursor-effects/canvas-cursor-effect'
import Nav from '../components/Nav'
import LampDemo from '../components/mage-ui/background/lamp'

const Home = () => {
  return (
    <>
        <CanvasCursor

        />
        <Nav />
      <div className='flex gap-2.5 w-[100%] h-screen bg-black'>
        <LampDemo />
      </div>
    </>
  )
}

export default Home