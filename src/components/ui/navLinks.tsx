"use client"
import React from 'react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { links } from '@/constants/links'
import { usePathname } from 'next/navigation'
import ModalCreateThread from '@/components/posts/modalCreateThread'

const NavLinks = () => {

  const pathname = usePathname()
  const path = pathname.split("/")  
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx">
      {links.map(({Icon, ...obj}) => (
        <TooltipProvider key={obj.name}>
          <Tooltip>
            {obj.name === "Buat thread" ? (
              <ModalCreateThread>
                <TooltipTrigger asChild>
                  <div className="nav-links lg:mr-10 cursor-pointer">
                    <Icon className="nav-links-icon"/>
                  </div>
                </TooltipTrigger>
              </ModalCreateThread>
            ) : (
              <TooltipTrigger asChild>
                <Link className={`nav-links lg:mr-10 ${obj.path ? path[1] === obj.path ?  "bg-gray-100 dark:bg-[#222]" : "" : ""}`} href={`/${obj.path}`}>
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