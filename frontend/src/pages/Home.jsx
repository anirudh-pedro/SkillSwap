import React from 'react'
import Spline from '../components/spline'
import HomeLeft from '../components/Homeleft'
import HomeRight from '../components/HomeRight'
import CanvasCursor from '../components/mage-ui/cursor-effects/canvas-cursor-effect'

const Home = () => {
  return (
    <>
      <div className='flex gap-2.5 w-[100%] h-fit'>
        <CanvasCursor />
        <HomeLeft />
        <HomeRight />
      </div>
    </>
  )
}

export default Home