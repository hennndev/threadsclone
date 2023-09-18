import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import HoverUser from './hoverUser'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, MessageSquare, Send, MoreHorizontal, Repeat2 } from 'lucide-react'

type PropsTypes = {
  data: ThreadsTypes
  isLoggedIn: boolean
}

const Thread = ({data, isLoggedIn}: PropsTypes) => {
  return (
    <div className="flex pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
      <div className="relative w-[30px] h-[30px] rounded-full mr-4">
        <Image 
          fill
          sizes="auto" 
          src={data.userPost.image.imageUrl} 
          alt="sample" 
          quality={75}
          className="w-full h-full object-cover rounded-full"/>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-between">
          <HoverUser userData={data.userPost} isLoggedIn={isLoggedIn}>
            <Link href={`/${data.userPost.username}`}>
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                {data.userPost.username}
              </h2>
            </Link>
          </HoverUser>
          <div className="flexx">
            <p className="text-sm text-gray-500 mr-3">{moment(data.createdAt).startOf('minutes').fromNow()}</p>
            <Popover>
              <PopoverTrigger asChild>
                <MoreHorizontal className="cursor-pointer w-5 h-5"/>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-50 p-0">
                <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Sembunyikan</p>
                <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Blokir</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-1">
          <p className="leading-[1.5] dark:text-gray-200 text-sm">{data.text}</p>
          {data.image?.imageUrl ? (
              <Image width={0} height={0} sizes="auto" src={data.image.imageUrl} alt={"thread-img"} className="w-auto h-auto object-cover mt-2"/>
          ) : null}
        </div>
        <div className="flexx space-x-3 mt-2">
          <Heart className="text-gray-600 dark:text-gray-300 cursor-pointer w-5"/>
          <MessageSquare className="text-gray-600 dark:text-gray-300 cursor-pointer w-5"/>
          <Repeat2 className="text-gray-600 dark:text-gray-300 cursor-pointer w-5.5"/>
          <Send className="text-gray-600 dark:text-gray-300 cursor-pointer w-5"/>
        </div>
        {data.likes.length || data.comments.length ? (
          <>
            <div className="flexx text-gray-500 dark:text-gray-400 space-x-2 mt-2 text-[15px]">
              {data.comments.length > 0 && <p className="cursor-pointer">{data.comments.length} Balasan</p>}
              <span>&middot;</span>
              {data.likes.length > 0 && <p className="cursor-pointer">{data.likes.length} Suka</p>}
          </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Thread