'use client'

import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[100vh] w-full'>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel='loading...'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default Loading