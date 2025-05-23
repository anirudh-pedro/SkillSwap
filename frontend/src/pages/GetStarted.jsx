import React from 'react'
import Home from './Home'
import Spline from '../components/spline'
import { Link } from 'react-router-dom'
const GetStarted = () => {
  return (
    <>
        <div className='text-white h-screen flex flex-col justify-center items-center'>
                <div className='flex flex-col gap-5 min-w-4 max-w-fit bg-black absolute'>
                    <Spline />
                </div>
                <div className='backdrop-blur-2xl bg-white/0 px-10 py-15 border border-white/20'>
                    <h1 className='text-5xl font-bold text-center'>Welcome to the Future</h1>
                    <p className='text-center'>This is a simple landing page for a web3 project.</p>
                    <div className='flex gap-5 justify-center mt-5'>
                        <Link to='/login' className='bg-transparent text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition duration-300'>Explore</Link>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'>Get Started</button>
                        <button className='bg-transparent text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition duration-300'>Learn More</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default GetStarted