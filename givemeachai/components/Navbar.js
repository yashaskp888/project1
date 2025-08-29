"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
// we used nextauth.js for checking the login status
// we used flowbite dropdown for the dropdown meu
// we use toastify to get the messages on screen
// we are setting showdropdown as hidden on click and allowing it to show on click again
// we can use javascript within className by using backtiks instead of inverted colon and with flower brackets as shown below

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowDropdown] = useState(false)

  return (

    <nav className="text-white bg-blue-950 pt-5 flex justify-between mx-auto md:h-16 flex-col md:flex-row ">
      <div className="text-xl logo font-bold">Get-Me-A-Chai</div>
      <div className="flex gap-13 relative">


       {session && <> <button id="dropdownDefaultButton"onBlur={()=>{
        setTimeout(()=>{
          setShowDropdown(false) // Hide dropdown when focus is lost
        }, 150) // Delay to allow click event to register
       }} onClick={()=>setShowDropdown(!showdropdown)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
        </button>
        
        <div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[125px] top-[50px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <Link href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
            </li>
            <li>
              <Link href="/Login" onClick={()=>{signOut()}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Out</Link>
            </li>
            <li>
              
               <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
            </li>
           
          </ul>
        </div></>}
        {session &&<Link href="/"> <button type="button"  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-10">Home</button></Link>}
        {session &&<Link href="/Login"> <button type="button" onClick={()=>{signOut()}} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-10">SignOut</button></Link>}
        {!session && <Link href="/Login"><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-10">Login</button></Link>}
      </div>
    </nav>
  )
}

export default Navbar
