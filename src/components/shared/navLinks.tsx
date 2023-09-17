"use client"
import React from 'react'
import Link from 'next/link'
import { links } from '@/constants/links'
import { usePathname, useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import ModalCreateThread from '@/components/shared/modalCreateThread'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PropsTypes = {
  user: {
    id: string
    name: string
    username: string
    image: string
    onboarded: boolean
  }
}

const NavLinks = ({user}: PropsTypes) => {
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()
  const path = pathname.split("/")
  const showMsgToast = () => {
    toast({
      title: "Belum dapat akses",
      description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
      action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Onboarding</ToastAction>
    })
  }
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx">
      {links.map(({Icon, ...obj}) => (
        <TooltipProvider key={obj.name}>
          <Tooltip>
            {obj.name === "Buat thread" ? (
              <ModalCreateThread userId={user.id} username={user.username} userImageUrl={user.image} onboarded={user.onboarded}>
                <TooltipTrigger asChild>
                  <div className="nav-links lg:mr-10 cursor-pointer" onClick={() => !user.onboarded && showMsgToast()}>
                    <Icon className="nav-links-icon"/>
                  </div>
                </TooltipTrigger>
              </ModalCreateThread>
            ) : (
              <TooltipTrigger asChild>
                <Link className={`nav-links lg:mr-10 
                  ${obj.path === "profile" ? 
                    path[1] === user.username ? "bg-gray-100 dark:bg-[#222]" : "" 
                    : 
                    path[1] === obj.path ?  "bg-gray-100 dark:bg-[#222]" : ""
                  }`} 
                  href={`/${obj.path === "profile" ? user.username : obj.path}`}>
                  <Icon className={`nav-links-icon 
                    ${obj.path === "profile" ? 
                      path[1] === user.username ? "text-gray-900 dark:text-gray-100" : "" 
                      : 
                      path[1] === obj.path ?  "text-gray-900 dark:text-gray-100" : ""
                    }`}/>
                </Link> 
              </TooltipTrigger>
            )}
            <TooltipContent>
              <p>{obj.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  )
}

export default NavLinks