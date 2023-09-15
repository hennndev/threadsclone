"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { apiRoute } from '@/config/config'
import { FaThreads } from 'react-icons/fa6'
import NavLinks from '@/components/shared/navLinks'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import ProfileIcon from '@/components/shared/profileIcon'

type UserTypes = {
  id: string
  username: string
  image: string
}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<UserTypes | Record<string, string>>({})
  const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')

  useEffect(() => {
    async function getCurrentUser() {
      const res = await fetch(`${apiRoute}/api/users`)
      const data = await res.json()
      if(data.user) {
        setUser(data.user)
      }
    }
   getCurrentUser()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <>
      <header className="container sticky top-0 p-4 bg-white z-10 dark:bg-[#101010]">
        <div className="flex-between">
          <Link href="/" className="ml-[49%] lg:ml-0">
            <FaThreads className="text-[26px] md:text-[32px] text-gray-700 dark:text-gray-200"/>
          </Link>
          <div className="hidden lg:inline">
            <NavLinks user={user as UserTypes}/>
          </div>
          <div className="flexx space-x-4">
            {theme === "light" ? (
              <RiMoonLine className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
            ) : (
              <RiSunLine className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
            )}
            <ProfileIcon user={user as UserTypes} theme={theme as string}/>
          </div>
        </div>
      </header>
      {/* bottom bar */}
      <div className="fixed bg-white z-10 dark:bg-[#101010] lg:hidden bottom-0 w-full p-3">
        <NavLinks user={user as UserTypes}/>
      </div>
    </>
  )
}

export default Navbar