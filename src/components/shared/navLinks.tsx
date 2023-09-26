"use client"
import React from 'react'
import Link from 'next/link'
import { useStore } from '@/store/store'
import { links } from '@/constants/links'
import { Badge } from '@/components/ui/badge'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import ModalCreateThread from '@/components/shared/modalCreateThread'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type PropsTypes = {
  currentUserData: UserInfoTypes
}
const NavLinks = ({currentUserData}: PropsTypes) => {
  const router = useRouter()
  const { toast } = useToast()
  const pathname = usePathname()
  const path = pathname.split("/")
  const statusNotif = useStore((state) => state.notif)
  const showMsgToast = () => {
    toast({
      title: "Belum dapat akses",
      description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
      action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Reformat</ToastAction>
    })
  }
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx">
      {links.map(({Icon, ...obj}) => (
        <TooltipProvider key={obj.name}>
          <Tooltip>
            {obj.name === "Buat thread" ? (
              <ModalCreateThread currentUserData={currentUserData}>
                <TooltipTrigger asChild>
                  <div className="nav-links lg:mr-10 cursor-pointer" onClick={() => !currentUserData.onboarded && showMsgToast()}>
                    <Icon className="nav-links-icon"/>
                  </div>
                </TooltipTrigger>
              </ModalCreateThread>
            ) : (
              obj.path === "profile" && !currentUserData.onboarded ? (
                <TooltipTrigger asChild>
                  <div onClick={showMsgToast} className={`nav-links relative lg:mr-10 
                    ${obj.path === "profile" ? 
                      path[1] === currentUserData.username ? "bg-gray-100 dark:bg-[#222]" : "" 
                      : 
                      path[1] === obj.path ?  "bg-gray-100 dark:bg-[#222]" : ""
                    }`}>
                    <Icon className={`nav-links-icon 
                      ${obj.path === "profile" ? 
                        path[1] === currentUserData.username ? "text-gray-900 dark:text-gray-100" : "" 
                        : 
                        path[1] === obj.path ?  "text-gray-900 dark:text-gray-100" : ""
                      }`}/>
                    <Badge variant="destructive" className="animate-pulse z-10 absolute w-4 h-4 p-0 flex-center top-1 right-2 text-xs">!</Badge>
                  </div> 
                </TooltipTrigger>
              ) : (
              <TooltipTrigger asChild>
                <Link className={`nav-links relative lg:mr-10 
                  ${obj.path === "profile" ? 
                    path[1] === currentUserData.username ? "bg-gray-100 dark:bg-[#222]" : "" 
                    : 
                    path[1] === obj.path ?  "bg-gray-100 dark:bg-[#222]" : ""
                  }`} 
                  href={`/${obj.path === "profile" ? currentUserData.username : obj.path}`}>
                  <Icon className={`nav-links-icon 
                    ${obj.path === "profile" ? 
                      path[1] === currentUserData.username ? "text-gray-900 dark:text-gray-100" : "" 
                      : 
                      path[1] === obj.path ?  "text-gray-900 dark:text-gray-100" : ""
                    }`}/>
                  {obj.name === "Aktivitas" && statusNotif > 0 ? (
                    <Badge variant="destructive" className="z-10 absolute w-4 h-4 p-0 flex-center top-1 right-2 text-xs">
                      {statusNotif}
                    </Badge>
                  ) : null}
                </Link> 
              </TooltipTrigger>
              )
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