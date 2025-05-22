import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../pages/Login'

const Profile = () => {
  return (
    <div className='flex gap-5'>
      <Link to="/login" className='bg-blue-500 text-white px-4 py-2 rounded'>Login</Link>
    </div>
  )
}

export default Profile