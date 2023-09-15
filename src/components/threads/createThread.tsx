"use client"
import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import ModalCreateThread from '@/components/shared/modalCreateThread'


type PropsTypes = {
  userId: string
  username: string
  userImageUrl: string
}

const CreateThread = (props: PropsTypes) => {
  return (
    <ModalCreateThread {...props}>
      <div className="w-full flexx pb-4 border-b border-gray-200 dark:border-gray-700 mb-10">
        <div className="relative w-[30px] h-[30px] rounded-full">
          <Image fill sizes="auto" src={props.userImageUrl} 
            alt="avatar" 
            quality={75}
            className="w-full h-full object-cover rounded-full"/>
        </div>
        <div className="flexx flex-1">
          <Input placeholder="Mulai ulas .." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium text-gray-500 placeholder:text-gray-500 text-base"/>
          <button className="border border-gray-300 text-gray-500 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm cursor-not-allowed">Kirim</button>
        </div>
      </div>
    </ModalCreateThread>
  )
}

export default CreateThread