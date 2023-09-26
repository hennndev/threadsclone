import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import HoverUser from '@/components/shared/hoverUser' 
import LikeThread from '@/components/threads/likeThread' 
import { MessageSquare, Repeat2, Send } from 'lucide-react'
import CommentThread from '@/components/threads/commentThread' 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type PropsTypes = {
  data: ThreadsTypes
  isCurrentUser: boolean
  currentUserData: UserInfoTypes
}

const ThreadIcons = ({data, isCurrentUser, currentUserData}: PropsTypes) => {
  return (
    <div className="flexx space-x-[2px] mt-2">
      <LikeThread
        threadId={data._id.toString()}
        currentUserDataId={currentUserData.id} 
        isLike={Boolean(data?.likes.find((obj: any) => obj._id.toString() === currentUserData.id))}/>
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#222]">
            <MessageSquare className="text-gray-800 dark:text-gray-300 cursor-pointer w-5"/>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[330px] xs:w-[400px] sm:w-[500px] md:w-[600px] min-h-[400px] max-h-[600px] overflow-y-auto">
          <div className="flex mb-4">
            <div className="relative w-[30px] h-[30px] rounded-full mr-4">
              <Image 
                fill
                sizes="auto" 
                src={data.userPost.image.imageUrl} 
                alt={data.userPost.username} 
                quality={75}
                className="w-full h-full object-cover rounded-full"/>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex-between">
                <HoverUser 
                  currentUserData={currentUserData}
                  userData={data.userPost} 
                  isCurrentUser={isCurrentUser}>
                  <Link href={`/${data.userPost.username}`}>
                    <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                      {data.userPost.username}
                    </h2>
                  </Link>
                </HoverUser>
                <div className="flexx">
                  <p className="text-sm text-gray-500 mr-3">{moment(data.createdAt).startOf('minutes').fromNow()}</p>
                </div>
              </div>
              <p className="leading-[1.5] dark:text-gray-200 text-sm">{data.text}</p>
              {data.image?.imageUrl ? (
                  <Image width={0} height={0} sizes="auto" src={data.image.imageUrl} alt={"thread-img"} className="w-auto h-auto object-cover mt-2"/>
              ) : null}
            </div>
          </div>
          {data.isCommented === "allowed" ? <CommentThread parentId={data._id.toString()} currentUserData={currentUserData}/> : (
            <p className="text-center text-sm">Komentar di nonaktifkan</p>
          )}
        </DialogContent>
      </Dialog>
      <div className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#222]">
        <Repeat2 className="text-gray-800 dark:text-gray-300 cursor-pointer w-5.5"/>
      </div>
      <div className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#222]">
        <Send className="text-gray-800 dark:text-gray-300 cursor-pointer w-5"/>
      </div>
    </div>
  )
}

export default ThreadIcons