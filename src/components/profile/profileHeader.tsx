import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type PropsTypes = {
  user: any
  isLoggedIn: string
}

const ProfileHeader = ({user, isLoggedIn}: PropsTypes) => {
  return (
    <div className='mb-10 pb-10 border-b border-gray-200 dark:border-gray-700'>
      <div className="flex-between mb-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-1 text-[#101010] dark:text-gray-100">{user.name}</h1>
          <h4>@{user.username}</h4>
        </div>
        <div className="relative w-[80px] h-[80px]">
          <Image fill sizes="auto" className="object-contain w-full h-ull rounded-full" src={user.image.imageUrl} alt={user.username}/>
        </div>
      </div>
      <div className="mb-5">
        <p className="mb-2">Programmer MERN and NEXTJS 🔥🔥</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">100 pengikut</p>
      </div>
      {isLoggedIn !== user.id && (
        <div className="flex">
          <Button className="w-full mr-4 font-semibold">Follow</Button>
          <Button variant="outline" className="w-full">Bagikan</Button>
        </div>
      )}
    </div>
  )
}

export default ProfileHeader