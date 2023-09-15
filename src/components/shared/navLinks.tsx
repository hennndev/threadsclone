"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { links } from '@/constants/links'
import { usePathname } from 'next/navigation'
import ModalCreateThread from '@/components/shared/modalCreateThread'


const NavLinks = () => {

  const pathname = usePathname()
  const path = pathname.split("/")
  const [user, setUser] = useState<Record<string, string>>({}) 
  
  useEffect(() => {
    async function getCurrentUser() {
      const res = await fetch("http://localhost:3000/api/users")
      const data = await res.json()
      if(data.user) {
        setUser(data.user)
      }
    }
   getCurrentUser()
  }, [])
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
                <Link className={`nav-links lg:mr-10 ${path[1] === obj.path ?  "bg-gray-100 dark:bg-[#222]" : ""} `} href={`/${obj.path}`}>
                  <Icon className="nav-links-icon"/>
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