"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import ModalCreateThread from '@/components/shared/modalCreateThread'


type UserTypes = {
  user: {
    id: string
    name: string
    username: string
    image: string
    onboarded: boolean
  }
}

const CreateThread = ({user}: UserTypes) => {
  const {toast} = useToast()
  const router = useRouter()
  const showMsgToast = () => {
    toast({
      title: "Belum dapat akses",
      description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
      action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Onboarding</ToastAction>
    })
  }
  return (
    <ModalCreateThread userId={user.id} username={user.username} userImageUrl={user.image} onboarded={user.onboarded}>
      <div className="w-full flexx pb-4 border-b border-gray-200 dark:border-gray-700 mb-10" onClick={() => !user?.onboarded && showMsgToast()}>
        <div className="relative w-[30px] h-[30px] rounded-full">
          <Image fill sizes="auto" src={user.image} 
            alt="avatar" 
            quality={75}
            className="w-full h-full object-cover rounded-full"/>
        </div>
        <div className="flexx flex-1">
          <Input readOnly placeholder="Mulai ulas .." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium text-gray-500 placeholder:text-gray-500 text-base"/>
          <button className="border border-gray-300 text-gray-500 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm cursor-not-allowed">Kirim</button>
        </div>
      </div>
    </ModalCreateThread>
  )
}

export default CreateThread