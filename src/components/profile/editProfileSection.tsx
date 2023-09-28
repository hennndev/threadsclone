"use client"
import React from 'react'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProfileForm from '@/components/forms/profileForm'

type PropsTypes = {
  userData: UserInfoTypes
}

const EditProfileSection = ({userData}: PropsTypes) => {
  const router = useRouter()
  return (
    <>
      <div onClick={() => router.back()} className="flexx space-x-2 mb-3 cursor-pointer">
        <MoveLeft className="w-5 text-gray-700 dark:text-gray-100"/>
        <p className="text-gray-700 dark:text-gray-100">Kembali</p>
      </div>
      <ProfileForm
        isThemeClasses="bg-gray-200 dark:bg-[#151515] text-gray-700 dark:text-gray-300"
        userData={userData}
        btnTitle="Edit"/>
    </>
  )
}
export default EditProfileSection