"use client"

import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='container'>
        <p className='text-center py-4 text-gray-600 dark:text-gray-500'>
          &copy; {new Date().getFullYear()} Patrick Renz Garcia. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
