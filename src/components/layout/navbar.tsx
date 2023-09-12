"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NavLinks from '../ui/navLinks'
import { useTheme } from 'next-themes'
import { FaThreads } from 'react-icons/fa6'
import { SignOutButton, CreateOrganization, OrganizationSwitcher } from "@clerk/nextjs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'


const Navbar = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')


  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <header className="container sticky top-0 p-4 bg-white z-10 dark:bg-[#101010]">
      <div className="flex-between">
        <Link href="/" className="ml-[49%] lg:ml-0">
          <FaThreads className="text-[26px] md:text-[32px] text-gray-700 dark:text-gray-200"/>
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
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODg5NDIzMTI/dj00IiwicyI6Im1jUGdmNzBQdTNTQS9ZV0RwaGZqNnhvNEZhRFFVbXZYQWF5VEc5R290UkUifQ" alt="avatar" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-0">
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Lihat Profil</p>
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Edit Profil</p>
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Komunitas</p>
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]" onClick={() => router.push("/create-organizations")}>Buat Komunitas</p>
              <SignOutButton>
                <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Logout</p>
              </SignOutButton>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Navbar