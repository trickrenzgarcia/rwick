'use client'

import React from 'react'

export default function BrowserId() {
  
  React.useEffect(() => {
    fetch('/api/browser', { credentials: 'include'})
  }, [])

  return null
}
