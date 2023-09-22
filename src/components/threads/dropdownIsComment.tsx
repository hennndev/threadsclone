"use client"
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  isCommented: string
  handleIsCommented: (value: string) => void
}
const DropdownIsComment = ({isCommented, handleIsCommented}: PropsTypes) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = (value: string) => {
    handleIsCommented(value)
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <p className="text-sm text-gray-500 mr-10 cursor-pointer">{isCommented === "allowed" ? "Aktifkan" : "Non aktifkan"} komentar</p>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <p className={`py-2 px-4 pb-3 text-sm cursor-pointer border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222] ${isCommented === "allowed" ? "border-transparent bg-gray-100 dark:bg-[#222]" : "text-gray-600 dark:text-gray-300"}`} onClick={() => handleClick("allowed")}>Aktifkan</p>
        <p className={`py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222] ${isCommented === "not-allowed" ? "border-transparent bg-gray-100 dark:bg-[#222]" : "text-gray-600 dark:text-gray-300"}`} onClick={() => handleClick("not-allowed")}>Nonaktifkan</p>
      </PopoverContent>
    </Popover>
)
}

export default DropdownIsComment