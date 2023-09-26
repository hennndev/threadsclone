import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiFillHeart } from 'react-icons/ai'
import FollowButton from '@/components/shared/followButton'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type PropsTypes = {
  likes: UserData[] | string[]
  currentUserData: UserInfoTypes
}

const UserLikeList = ({likes, currentUserData}: PropsTypes) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-sm hover:underline">{likes.length} Suka</p>
      </DialogTrigger>      
      <DialogContent className="flex flex-col w-[330px] xs:w-[400px] sm:w-[500px] md:w-[600px] max-h-[600px] overflow-y-auto">
        <h2 className="text-center font-medium text-base">{likes.length} Suka</h2>
        <div className="flex flex-col">
          {likes.map((obj: any) => (
            <Link href={`/${obj.username}`} key={obj._id} passHref className={`flex mb-4 cursor-pointer`}>
              <div className="relative w-[30px] h-[30px] rounded-full mr-4">
                <Image 
                  fill
                  sizes="auto" 
                  src={obj.image.imageUrl} 
                  alt={obj.username} 
                  quality={75}
                  className="w-full h-full object-cover rounded-full"/>
                <div className="absolute -bottom-2 -right-1 bg-red-500 dark:bg-red-400 cursor-pointer p-1 rounded-full text-center">
                  <AiFillHeart className="text-white cursor-pointer text-[10px]"/>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-between flex-1">
                  <div className="flex flex-1 flex-col">
                    <h2 className="flex-1 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                      {obj.username}
                    </h2>
                    <h3 className="text-gray-500">{obj.name}</h3>
                  </div>
                  {obj._id.toString() !== currentUserData.id ? (
                    <FollowButton 
                      classes="w-max py-1.5 px-2 text-[12px] sm:text-sm"
                      currentUserData={currentUserData} 
                      userDataId={obj._id.toString()} 
                      isFollowed={Boolean(obj.followers.find((_id: string) => _id.toString( ) === currentUserData.id))}/>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserLikeList