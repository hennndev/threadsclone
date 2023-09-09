"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NavLinks from '../ui/navLinks'
import { useTheme } from 'next-themes'
import { FaThreads } from 'react-icons/fa6'
import { UserButton } from "@clerk/nextjs";
import { RiMenu4Line, RiSunLine, RiMoonLine } from 'react-icons/ri'


const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <header className="container sticky top-0 p-4 bg-primary-light z-10 dark:bg-primary-dark">
      <div className="flex-between">
        <Link href="/" className="ml-[49%] lg:ml-0">
          <FaThreads className="text-[26px] md:text-[32px] text-primary-light dark:text-primary-dark"/>
        </Link>
        <div className="hidden lg:inline">
          <NavLinks/>
        </div>
        <div className="flexx space-x-4">
          {theme === "light" ? (
            <RiMoonLine className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
          ) : (
            <RiSunLine className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
          )}
          {/* <RiMenu4Line className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark ml-3"/> */}
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
    </header>
  )
}

export default Navbar