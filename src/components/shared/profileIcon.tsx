"use client"
import React, { useState } from 'react'
import { dark } from '@clerk/themes'
import { useRouter } from 'next/navigation'
import { SignOutButton, OrganizationSwitcher } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  user: {
    id: string
    username: string
    image: string
  }
  theme: string
}

const ProfileIcon = ({user, theme}: PropsTypes) => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const handleRoute = (route: string) => {
    setOpen(false)
    router.push(route)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image} alt={user.username} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-0">
        <p className="list-popover" onClick={() => handleRoute(`/${user.username}`)}>Lihat Profil</p>
        <p className="list-popover" onClick={() => handleRoute(`/${user.username}/edit`)}>Edit Profil</p>
        <Popover>
          <PopoverTrigger className="w-full text-left">
            <p className="list-popover">Komunitas</p>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-50 p-0">
            <OrganizationSwitcher 
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  organizationSwitcherTrigger: "p-3",
                  userPreviewAvatarContainer: "hidden"
                }
            }}/>
          </PopoverContent>
        </Popover>
        <SignOutButton>
          <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Logout</p>
        </SignOutButton>
      </PopoverContent>
    </Popover>
  )
}

export default ProfileIcon