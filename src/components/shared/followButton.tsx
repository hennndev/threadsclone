"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { followUser } from '@/lib/actions/user.actions'

type PropsTypes = {
  isFollowed: boolean
  classes?: string
  userDataId: string
  currentUserData: UserInfoTypes
}

const FollowButton = ({isFollowed, userDataId, currentUserData, classes = ""}: PropsTypes) => {
  const router = useRouter()
  const { toast } = useToast()
  const pathname = usePathname()
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if(!currentUserData.onboarded) {
      toast({
        title: "Belum dapat akses",
        description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
        action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Onboarding</ToastAction>
      })
    } else {
      try {
        await followUser(userDataId, currentUserData.username, currentUserData.id, isFollowed ? "unfollow" : "follow", pathname).then(() => {
          toast({
            duration: 5000,
            title: "Berhasil!",
            description: isFollowed ? "Kamu unfollow user ini" : "Kamu follow user ini", 
          })
        })
      } catch (error) {
        toast({
          duration: 5000,
          title: "Gagal!",
          description: "Kamu sudah follow user ini sebelumnya",
        })
      }
    }
  }
  console.log(currentUserData)
  return (
    <Button size="sm" className={`text-sm font-semibold ${classes}`} onClick={(e) => handleFollow(e)}>
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton