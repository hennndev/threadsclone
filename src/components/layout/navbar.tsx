import React from 'react'
import Link from 'next/link'
import DarkMode from '../shared/darkMode'
import { FaThreads } from 'react-icons/fa6'
import { currentUser } from '@clerk/nextjs'
import NavLinks from '@/components/shared/navLinks'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileIcon from '@/components/shared/profileIcon'

const Navbar = async () => {
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const user: UserInfoTypes | null = await fetchUser(userLoggedIn.id)
  let userData = {
    id: user?.id || userLoggedIn.id,
    name: user?.name || userLoggedIn.firstName,
    username: user?.username || userLoggedIn.username,
    image: user?.image || userLoggedIn.imageUrl,
    onboarded: user?.onboarded || false
  }
  return (
    <>
      <header className="container sticky top-0 p-4 bg-white z-10 dark:bg-[#101010]">
        <div className="flex-between">
          <Link href="/" className="ml-[49%] lg:ml-0">
            <FaThreads className="text-[26px] md:text-[32px] text-gray-700 dark:text-gray-200"/>
          </Link>
          <div className="hidden lg:inline">
            <NavLinks user={userData as UserInfoTypes}/>
          </div>
          <div className="flexx space-x-4">
            <DarkMode/>
            <ProfileIcon user={userData as UserInfoTypes}/>
          </div>
        </div>
      </header>
      <div className="fixed bg-white z-10 dark:bg-[#101010] lg:hidden bottom-0 w-full p-3">
        <NavLinks user={userData as UserInfoTypes}/>
      </div>
    </>
  )
}

export default Navbar