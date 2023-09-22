"use client"
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const DarkMode = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    theme === "light" ? (
      <Moon className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
    ) : (
      <Sun className="text-[26px] md:text-[30px] text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-primary-dark" onClick={handleTheme}/>
    )
  )
}

export default DarkMode