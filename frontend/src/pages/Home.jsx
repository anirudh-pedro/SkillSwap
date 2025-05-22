import React from 'react'
import Spline from '../components/spline'
import HomeLeft from '../components/HomeLeft'
import { Outlet } from 'react-router-dom'
import HomeRight from '../components/HomeRight'
import CanvasCursor from '../components/mage-ui/cursor-effects/canvas-cursor-effect'

import ClickSpark from '../components/reactbits/ClickSpark'
import LampDemo from '../components/mage-ui/background/lamp'

const Home = () => {
  return (
    <>
      <div className='flex gap-2.5 w-[100%] h-screen bg-black'>
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <CanvasCursor />
          {/* Nav component is already included in the Layout component */}
          <LampDemo />
        </ClickSpark>
      </div>
    </>
  )
}

export default Home