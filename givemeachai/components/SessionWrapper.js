"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
// we used nextauth.js for checking whether the client is logged in or not
export default function SessionWrapper
  ({children})
 {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}