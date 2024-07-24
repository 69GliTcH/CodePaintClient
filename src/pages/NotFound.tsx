import React from 'react'

export default function NotFound() {
  return (
    <div className='w-full h-[calc(100dvh-60px)] bg-gray-800 text-white flex flex-col justify-center items-center'>
        <h1 className='text-6xl'>404</h1>
        <h2>Page not found.</h2>
    </div>
  )
}
