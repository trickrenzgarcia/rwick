"use client"

import Link from 'next/link'
import React from 'react'
import Mode from './Mode'

export default function Navbar() {
  return (
    <header className='w-full h-[70px] flex fixed z-50 top-0 left-0 backdrop-blur-md bg-opacity-40 shadow-sm'>
      <nav className='container max-w-7xl h-full flex mx-auto items-center justify-between'>
        <Link href='/'>
          <h1 className='text-lg font-extrabold'>/rwick</h1>
        </Link>
        <ul className='hidden lg:flex gap-4 text-gray-600 dark:text-gray-400'>
          <Link href='/'>
            <li className='hover:underline'>Home</li>
          </Link>
          <Link href='#about'>
            <li className='hover:underline'>About</li>
          </Link>
          <Link href='/projects'>
            <li className='hover:underline'>Projects</li>
          </Link>
          <Link href='/#contact'>
            <li className='hover:underline'>Contact</li>
          </Link>
        </ul>
        <div>
          <Mode />
        </div>
      </nav>
    </header>
  )
}
