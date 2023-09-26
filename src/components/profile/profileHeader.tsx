import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FollowButton from '@/components/shared/followButton'

type PropsTypes = {
  user: any
  userLoggedInData: any
  isLoggedIn: string
}

const ProfileHeader = ({user, userLoggedInData, isLoggedIn}: PropsTypes) => {
  const isFollowed = Boolean(user.followers?.find((_id: string) => _id.toString() === userLoggedInData.id))
  return (
    <div className={`mb-10 pb-10 ${user ? "border-b" : ""} border-gray-200 dark:border-[#222]`}>
      <div className="flex-between mb-5">
        <div className="flex flex-col">
          <h1 className="flexx text-3xl font-bold mb-1 text-[#101010] dark:text-gray-100">
            {user.name}
          </h1>
          <div className="flexx">
            @{user.username} 
            {isLoggedIn === user?.id ? (
              <Link href={`/${user.username}/edit`} className="ml-1 py-1.5 px-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#222] cursor-pointer">
                <Pencil className="text-gray-700 dark:text-gray-300 w-4"/>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative w-[80px] h-[80px]">
          <Image fill sizes="auto" className="object-contain w-full h-ull rounded-full" src={user?.image.imageUrl || userLoggedInData.imageUrl} alt={user?.username || userLoggedInData.username}/>
        </div>
      </div>
      <div>
        <p className="mb-2">{user?.bio || ""}</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm cursor-pointer hover:underline">{user?.followers.length} pengikut</p>
      </div>
      {isLoggedIn !== user?.id ? (
        <div className="flex mt-5">
          <FollowButton classes="flex-1 w-full" isFollowed={isFollowed} userDataId={user?._id.toString()} currentUserData={userLoggedInData}/>
          <Button variant="outline" className="w-full flex-1 ml-3">Bagikan</Button>
        </div>
      ) : null}
    </div>
  )
}

export default ProfileHeader