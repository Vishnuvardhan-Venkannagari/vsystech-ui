import React from 'react'

export default function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColort='text-white',
    className='',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColort} ${className}`} {...props}>
        {children}
    </button>
  )
}
