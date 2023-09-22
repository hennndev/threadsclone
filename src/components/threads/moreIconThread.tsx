"use client"
import React, { Fragment, useState } from 'react'
import DeleteThread from './deleteThread'
import { MoreHorizontal } from 'lucide-react'
import EditThread from '@/components/threads/editThread'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  dataEdit: {
    id: string
    text: string,
    image: {
      imageKey?: string
      imageUrl: string
    } | null
    isCommented: string
  }
  userId: string
  isCurrentUser: boolean
  currentUserData: UserInfoTypes
}

const MoreIconThread = ({dataEdit, userId, isCurrentUser, currentUserData}: PropsTypes) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MoreHorizontal className="cursor-pointer w-5 h-5"/>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-50 p-0">
        {isCurrentUser ? (
          <Fragment>
            <EditThread dataEdit={dataEdit} currentUserData={currentUserData} closePopover={() => setOpen(false)}/>
            <DeleteThread threadId={dataEdit.id.toString()} userId={userId} imageKey={dataEdit?.image?.imageKey} closePopover={() => setOpen(false)}/>
          </Fragment>
        ) : (
          <Fragment>
            <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Sembunyikan</p>
            <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Blokir</p>
          </Fragment>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default MoreIconThread