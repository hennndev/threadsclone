import React from 'react'
import Image from 'next/image'
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
          <h1 className="text-3xl font-bold mb-1 text-[#101010] dark:text-gray-100">{user?.name || userLoggedInData.firstName}</h1>
          <h4>@{user?.username || userLoggedInData.username}</h4>
        </div>
        <div className="relative w-[80px] h-[80px]">
          <Image fill sizes="auto" className="object-contain w-full h-ull rounded-full" src={user?.image.imageUrl || userLoggedInData.imageUrl} alt={user?.username || userLoggedInData.username}/>
        </div>
      </div>
      <div className="mb-5">
        <p className="mb-2">{user?.bio || ""}</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">{user?.followers.length} pengikut</p>
      </div>
      {isLoggedIn !== user?.id && user && (
        <div className="flex">
          <FollowButton isFollowed={isFollowed} threadUserDataId={user?._id.toString()} currentUserData={userLoggedInData}/>
          <Button variant="outline" className="w-full flex-1 ml-3">Bagikan</Button>
        </div>
      )}
    </div>
  )
}

export default ProfileHeader