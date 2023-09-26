"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import ModalCreateThread from '@/components/shared/modalCreateThread'

type PropsTypes = {
  currentUserData: UserInfoTypes
}
const CreateThread = ({currentUserData}: PropsTypes) => {
  const {toast} = useToast()
  const router = useRouter()
  const showMsgToast = () => {
    toast({
      title: "Belum dapat akses",
      description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
      action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Reformat</ToastAction>
    })
  }
  return (
    <ModalCreateThread currentUserData={currentUserData}>
      <div className="w-full flexx pb-4 border-b border-gray-200 dark:border-[#222] mb-10" onClick={() => !currentUserData?.onboarded && showMsgToast()}>
        <div className="relative w-[30px] h-[30px] rounded-full">
          <Image fill sizes="auto" src={currentUserData.image} alt={currentUserData.username} quality={75} className="w-full h-full object-cover rounded-full"/> 
        </div>
        <div className="flexx flex-1">
          <Input readOnly placeholder="Mulai ulas..." className="border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium text-gray-500 placeholder:text-gray-500 placeholder:font-normal text-base"/>
          <button className="button-outline cursor-default">Kirim</button>
        </div>
      </div>
    </ModalCreateThread>
  )
}
export default CreateThread