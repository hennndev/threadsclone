import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type PropsTypes = {
  children: React.ReactNode
  dialogTitle: string
  dialogDesc: string
  btnTitle: string
}

const ModalCreateThread = ({children, dialogTitle, dialogDesc, btnTitle}: PropsTypes) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[320px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
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
            <Input placeholder="Mulai ulas .." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium text-gray-500 placeholder:text-gray-500 text-sm p-0"/>
          </div>
        </div>
        <DialogFooter className="flex-between mt-10">
          <p className="text-sm text-gray-500 mr-10">Siapa saja yang bisa membalas</p>
          <button className="border w-max border-gray-300 text-gray-500 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm cursor-not-allowed">{btnTitle}</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateThread