import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Paperclip } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'



type PropsTypes = {
  children: React.ReactNode
}

const ModalCreateThread = ({children}: PropsTypes) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[330px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat thread baru</DialogTitle>
        </DialogHeader>
        <div className="w-full flex">
          <div className="relative w-[30px] h-[30px] rounded-full mr-3">
            <Image fill sizes="auto" src="https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png" 
              alt="avatar" 
              quality={75}
              className="w-full h-full object-cover rounded-full"/>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="font-medium mb-2 text-sm">Hennndev</h3>
            <Textarea rows={2} tabIndex={-1} placeholder="Mulai ulas .." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium placeholder:text-gray-500 text-sm p-0"/>
            <Paperclip className="mt-1 w-4 text-gray-500 cursor-pointer"/>
          </div>
        </div>
        <DialogFooter className="flex-between mt-10">
          <Popover>
            <PopoverTrigger asChild>
              <p className="text-sm text-gray-500 mr-10 cursor-pointer">Siapa saja bisa membalas</p>
            </PopoverTrigger>
            <PopoverContent className="w-50 p-0">
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Siapa saja</p>
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Profil yang anda ikuti</p>
              <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Hanya yang disebut</p>
            </PopoverContent>
          </Popover>
          <button className="border w-max border-gray-300 text-gray-500 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm cursor-not-allowed">Kirim</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateThread