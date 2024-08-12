"use client"

import { useTheme } from 'next-themes'
import React, { memo } from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

function Mode() {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ?
      (
        <SunIcon className='w-5 h-5' /> 
      ):
      (
        <MoonIcon className='w-5 h-5' />
      )
      }
    </Button>
  )
}

export default memo(Mode)
