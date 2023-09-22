"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { likeThread } from '@/lib/actions/threads.actions'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

type PropsTypes = {
  threadId: string
  currentUserDataId: string
  isLike: boolean
}

const LikeThread = ({threadId, isLike, currentUserDataId}: PropsTypes) => {
  const { toast } = useToast()
  const pathname = usePathname()
  const handleLike = async () => {
    try {
      await likeThread(threadId, currentUserDataId, isLike ? "dislike" : "like", pathname)
      toast({
        duration: 3000,
        title: "Berhasil",
        description: isLike ? "Thread tidak disukai" : "Thread disukai"
      })
    } catch (error) {
      toast({
        duration: 3000,
        title: "Gagal",
        description: "Thread sudah disukai"
      })
    }
  }
  return (
    <div className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#222]">
      {!isLike ? <AiOutlineHeart className="text-gray-800 dark:text-gray-300 cursor-pointer text-[22px]" onClick={handleLike}/> :
      <AiFillHeart className="text-red-500 dark:text-red-400 cursor-pointer text-[22px]" onClick={handleLike}/>
      }
    </div>
  )
}

export default LikeThread