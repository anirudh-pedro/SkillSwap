import React from 'react'

const Profile = () => {
  return (
    <div className='flex gap-5'>
      <div className='w-12 h-12 rounded-full overflow-hidden'>  
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div>
        <h1 className='text-xl font-bold'>John Doe</h1>
        <p className='hover:text-red-500 cursor-pointer'>Log Out</p>
      </div>
    </div>
  )
}

export default Profile