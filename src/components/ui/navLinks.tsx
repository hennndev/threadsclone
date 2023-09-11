"use client"
import React from 'react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from 'next/navigation'
import { RiHomeSmile2Line, RiSearch2Line, RiEditBoxLine, RiHeart3Line, RiUser3Line, RiGroupLine } from 'react-icons/ri'

const NavLinks = () => {

  const pathname = usePathname()
  const path = pathname.split("/")  
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/">
                <RiHomeSmile2Line className="nav-links-icon"/>
              </Link> 
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "search" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/search">
                  <RiSearch2Line className="nav-links-icon"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "new-post" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/search">
                <RiEditBoxLine className="nav-links-icon"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "activity" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/activity">
                <RiHeart3Line className="nav-links-icon"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Activity</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "community" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/community">
                <RiGroupLine className="nav-links-icon"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link className={`nav-links lg:mr-10 ${path[1] == "profile" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/profile">
                <RiUser3Line className="nav-links-icon"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    </nav>
  )
}

export default NavLinks