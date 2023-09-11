"use client"
import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import Modal from '@/components/posts/modalCreateThread'


type PropsTypes = {
  user: any
}

const CreateThread = ({user}: any) => {
  return (
    <Modal dialogTitle="Create thread" dialogDesc="Create new thread" btnTitle="Kirim">
      <div className="w-full flexx pb-4 border-b border-gray-200 dark:border-gray-700 mb-10">
        <div className="relative w-[30px] h-[30px] rounded-full">
          <Image fill sizes="auto" src="https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png" 
            alt="avatar" 
            quality={75}
            className="w-full h-full object-cover rounded-full"/>
        </div>
        <div className="flexx flex-1">
          <Input placeholder="Mulai ulas .." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium text-gray-500 placeholder:text-gray-500 text-base"/>
          <button className="border border-gray-300 text-gray-500 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm cursor-not-allowed">Kirim</button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateThread