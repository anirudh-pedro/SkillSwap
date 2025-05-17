import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

const outlet = () => {
  return (
    <div className='flex flex-col gap-3'>
        <Nav />
        <Outlet />
    </div>
  )
}

export default outlet