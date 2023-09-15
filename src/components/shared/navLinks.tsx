"use client"
import React from 'react'
import Link from 'next/link'
import { links } from '@/constants/links'
import { usePathname } from 'next/navigation'
import ModalCreateThread from '@/components/shared/modalCreateThread'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PropsTypes = {
  user: {
    id: string
    username: string
    image: string
  }
}

const NavLinks = ({user}: PropsTypes) => {
  const pathname = usePathname()
  const path = pathname.split("/")
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx">
      {links.map(({Icon, ...obj}) => (
        <TooltipProvider key={obj.name}>
          <Tooltip>
            {obj.name === "Buat thread" ? (
              <ModalCreateThread userId={user.id} username={user.username} userImageUrl={user.image}>
                <TooltipTrigger asChild>
                  <div className="nav-links lg:mr-10 cursor-pointer">
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