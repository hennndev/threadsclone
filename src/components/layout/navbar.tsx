"use client"
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useStore } from '@/store/store'
import { FaThreads } from 'react-icons/fa6'
import NavLinks from '@/components/shared/navLinks'
import DarkMode from '@/components/shared/darkMode'
import ProfileIcon from '@/components/shared/profileIcon'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Navbar = () => {
  const { data, isValidating } = useSWR('/api/getuser', fetcher)  
  const addStatusNotif = useStore((state) => state.addStatusNotif)

  useEffect(() => {
    if(data && data.user.onboarded) {
      addStatusNotif(data.user.activities)
    } else {
      addStatusNotif(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isValidating])
  
  return (
    <>
      <header className="container sticky top-0 p-4 bg-white z-10 dark:bg-[#101010]">
        <div className="flex-between">
          <Link href="/" className="ml-[49%] lg:ml-0">
            <FaThreads className="text-[26px] md:text-[32px] text-gray-700 dark:text-gray-200"/>
          </Link>
          <div className="hidden lg:inline">
            {data ? <NavLinks currentUserData={data.user as UserInfoTypes}/> : null}
          </div>
          <div className="flexx space-x-4">
            <DarkMode/>
            {data ? <ProfileIcon currentUserData={data.user as UserInfoTypes}/> : null}
          </div>
        </div>
      </header>
      <div className="fixed bg-white z-10 dark:bg-[#101010] lg:hidden bottom-0 w-full p-3">
        {data ? <NavLinks currentUserData={data.user as UserInfoTypes}/> : null}
      </div>
    </>
  )
}
export default Navbar