"use client"
import React, { SyntheticEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HoverUser from '@/components/shared/hoverUser'
import FollowButton from '@/components/shared/followButton'

type PropsTypes = {
  users: UserData[]
  userLoggedInId: string
  currentUserData: UserInfoTypes
}

const UsersList = ({users, userLoggedInId, currentUserData}: PropsTypes) => {
  const router = useRouter()
  const handleRoute = (e: SyntheticEvent<HTMLDivElement>, route: string) => {
    e.stopPropagation()
    router.push(route)
  }
  return (
    <div className="flex flex-col mt-10">
      {users.length > 0 ? users.map((user: UserData) => (
        <div onClick={(e) => handleRoute(e, user.username)} className="flex pb-4 border-b border-gray-200 dark:border-[#222] mb-4 cursor-pointer" key={user._id}>
          <div className="relative w-[30px] h-[30px] rounded-full mr-4">
            <Image 
              fill
              sizes="auto" 
              src={user.image.imageUrl} 
              alt={user.username} 
              quality={75}
              className="w-full h-full object-cover rounded-full"/>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-between flex-1">
              <div className="flex flex-1 flex-col">
                <HoverUser 
                  userData={user}
                  currentUserData={currentUserData} 
                  isCurrentUser={user.id === userLoggedInId}>
                  <Link href={`/${user.username}`}>
                    <h2 className="flex-1 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                      {user.username}
                    </h2>
                  </Link>
                </HoverUser>
                <h2 className="text-gray-500">{user.name}</h2>
              </div>
              <FollowButton 
                classes="w-max"
                currentUserData={currentUserData} 
                userDataId={user?._id.toString()} 
                isFollowed={Boolean(user?.followers.find((_id: string) => _id.toString() === currentUserData.id))}/>
            </div>
            <p className="mt-3 text-sm">{user.followers.length} pengikut</p>
          </div>
        </div>
      )) : (
        <div className="flex-center">
          <p className="text-sm">User tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}

export default UsersList