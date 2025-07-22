"use client"

import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { IconLogout } from "@tabler/icons-react"

export default function Logout() {
  const { status } = useSession()

  if (status === "loading") {
    return null // Don't render anything while loading session
  }

  if (status !== "authenticated") {
    return null; // Don't render the button if not authenticated
  }

  return (
    <Button variant="outline" size="icon" onClick={async () => await signOut({ redirectTo: "/"})}>
      <IconLogout className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <IconLogout className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Logout</span>
    </Button>
  )
}
