"use client"
import React, { useState } from 'react'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { SignOutButton, OrganizationSwitcher } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  currentUserData: UserInfoTypes
}

const ProfileIcon = ({currentUserData: {image, username, onboarded}}: PropsTypes) => {
  const router = useRouter()
  const { toast } = useToast()
  const { theme } = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const showMsgToast = () => {
    toast({
      title: "Belum dapat akses",
      description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
      action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Reformat</ToastAction>
    })
  }
  const handleRoute = (route: string) => {
    if(onboarded) {
      setOpen(false)
      router.push(route)
    } else {
      showMsgToast()
    }
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Avatar className="cursor-pointer">
            <AvatarImage src={image} alt={username} />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          {!onboarded ? (
            <Badge variant="destructive" className="z-[100] absolute w-4 h-4 p-0 flex-center -bottom-2 -left-1 text-xs animate-pulse">!</Badge>
          ) : null}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-0">
        <p className={`list-popover ${!onboarded ? "text-gray-500 dark:text-gray-700 hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed hover:border-[#ccc] hover:dark:border-[#2b2b2b]" : ""}`} onClick={() => handleRoute(`/${username}`)}>Lihat Profil</p>
        <p className={`list-popover ${!onboarded ? "text-gray-500 dark:text-gray-700 hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed hover:border-[#ccc] hover:dark:border-[#2b2b2b]" : ""}`} onClick={() => handleRoute(`/${username}/edit`)}>Edit Profil</p>
        <Popover>
          <PopoverTrigger className="w-full text-left outline-none" onClick={() => !onboarded && showMsgToast()}>
            <p className={`list-popover ${!onboarded ? "text-gray-500 dark:text-gray-700 hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed" : ""}`}>Komunitas</p>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-50 p-0">
            {onboarded ? (
              <OrganizationSwitcher 
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    organizationSwitcherTrigger: "p-3",
                    userPreviewAvatarContainer: "hidden"
                  }
              }}/>
            ) : null}
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