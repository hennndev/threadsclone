"use client"
import React from 'react'
import Link from 'next/link'
import { Tooltip } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import { RiHomeSmile2Line, RiSearch2Line, RiEditBoxLine, RiHeart3Line, RiUser3Line, RiGroupLine } from 'react-icons/ri'

const NavLinks = () => {

  const pathname = usePathname()
  const path = pathname.split("/")

  console.log(path)
  
  return (
    <nav className="justify-between lg:ml-20 lg:justify-normal flexx lg:space-x-10">
      <Link className={`nav-links ${path[1] == "" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/">
        <Tooltip content="Home">
          <RiHomeSmile2Line className="nav-links-icon"/>
        </Tooltip>
      </Link>
      <Link className={`nav-links ${path[1] == "search" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/search">
        <Tooltip content="Search">
          <RiSearch2Line className="nav-links-icon"/>
        </Tooltip>
      </Link>
      <Link className={`nav-links ${path[1] == "new-post" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/search">
        <Tooltip content="New Post">
          <RiEditBoxLine className="nav-links-icon"/>
        </Tooltip>
      </Link>
      <Link className={`nav-links ${path[1] == "activity" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/activity">
        <Tooltip content="Activity">
          <RiHeart3Line className="nav-links-icon"/>
        </Tooltip>
      </Link>
      <Link className={`nav-links ${path[1] == "community" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/community">
        <Tooltip content="Community">
          <RiGroupLine className="nav-links-icon"/>
        </Tooltip>
      </Link>
      <Link className={`nav-links ${path[1] == "profile" ? "bg-gray-100 dark:bg-[#222]" : ""}`} href="/profile">
        <Tooltip content="Profile">
          <RiUser3Line className="nav-links-icon"/>
        </Tooltip>
      </Link>
    </nav>
  )
}

export default NavLinks