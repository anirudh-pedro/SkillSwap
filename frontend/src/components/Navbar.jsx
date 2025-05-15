import React, { useState } from 'react'

const Navbar = () => {
  const [option,setOption] = useState("home")
  const navList = ["Home","Connect","Contact Us"]
  return (
    <div className='flex gap-10'>
      {
        navList.map((elem,ind)=>(
          <div key={ind} className={`${elem.split()[0].toLowerCase()== option ? "text-blue-500":"text-gray-400 hover:text-blue-300"} cursor-pointer relative text-lg font-medium transition-all duration-300 
                      pb-1`} onClick={()=>setOption(elem.split()[0].toLowerCase())}>
            {elem}
          </div>
        ))
      }
    </div>
  )
}

export default Navbar