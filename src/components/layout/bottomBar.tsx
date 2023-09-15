"use client"
import React from 'react'
import NavLinks from '../shared/navLinks'

const BottomBar = () => {
  return (
    <div className="fixed bg-white z-10 dark:bg-[#101010] lg:hidden bottom-0 w-full p-3">
      <NavLinks/>
    </div>
  )
}

export default BottomBar