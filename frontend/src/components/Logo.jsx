import React from 'react'
import SparklesPreview from './mage-ui/background/sparkles'
import SparklesCore from './mage-ui/background/sparkles'
const Logo = () => {
  return (
    <div className='min-h-5 max-h-5 mt-4 items-center flex'>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}  // Increase or decrease for more/fewer particles
          className="w-full h-full"
          particleColor="#FFFFFF"  // Change color if desired
        />
    </div>
  )
}

export default Logo