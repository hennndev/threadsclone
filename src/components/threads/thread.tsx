import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import HoverUser from '@/components/threads/hoverUser' //DONEE ✅
import ThreadIcons from '@/components/threads/threadIcons' //DONEE ✅
import MoreIconThread from '@/components/threads/moreIconThread' //DONEE ✅

type PropsTypes = {
  data: ThreadsTypes //thread data hasil mapping
  isCurrentUser: boolean //untuk mengecek apakah thread dibuat oleh user login saat ini
  currentUserData: UserInfoTypes // user data login dari database
}

const Thread = ({data, isCurrentUser, currentUserData}: PropsTypes) => {
  return (
    <div className="flex pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
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
            threadUserData={data.userPost} //info user yang upload thread
            currentUserData={currentUserData} 
            isCurrentUser={isCurrentUser}>
            <Link href={`/${data.userPost.username}`}>
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                {data.userPost.username}
              </h2>
            </Link>
          </HoverUser>
          <div className="flexx">
            <p className="text-sm text-gray-500 mr-3">{moment(data.createdAt).startOf('minutes').fromNow()}</p>
            <MoreIconThread 
              dataEdit={{
                id: data._id.toString(),
                text: data?.text || "",
                image: data.image?.imageUrl ? data.image : null,
                isCommented: data?.isCommented,
              }}
              userId={data.userPost._id.toString()}
              isCurrentUser={isCurrentUser} 
              currentUserData={currentUserData}/>
          </div>
        </div>
        <Link href={`/${data.userPost.username}/threads/${data._id}`} className="mt-1">
          <p className="leading-[1.5] dark:text-gray-200 text-sm">{data.text}</p>
          {data.image?.imageUrl ? (
              <Image 
                width={0} 
                height={0} 
                sizes="auto" 
                priority
                src={data.image.imageUrl} 
                alt={data.text ? `${data.text}-thread-image` : "thread-image"} 
                className="w-auto h-auto object-cover mt-2"/>
          ) : null}
        </Link>
        {currentUserData.onboarded ? (
          <ThreadIcons 
            data={data} 
            isCurrentUser={isCurrentUser} 
            currentUserData={currentUserData}/>
        ) : null}
        {data.likes.length || data.comments.length ? (
          <>
            <div className="flexx text-gray-500 dark:text-gray-400 space-x-2 mt-2 text-[15px]">
              {data.comments.length > 0 && !data.parentId && <Link href={`/${data.userPost.username}/threads/${data._id}`} className="cursor-pointer text-sm hover:underline">{data.comments.length} Balasan</Link>}
              {data.likes.length && data.comments.length ? <span>&middot;</span> : null}
              {data.likes.length > 0 && <p className="cursor-pointer text-sm hover:underline">{data.likes.length} Suka</p>}
          </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Thread