"use client"
import {SessionProvider} from "next-auth/react"

const SessionAuthProvider = ({children} ) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionAuthProvider