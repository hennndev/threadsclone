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
  threadUserDataId: string
  currentUserData: UserInfoTypes
}

const FollowButton = ({isFollowed, threadUserDataId, currentUserData}: PropsTypes) => {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleFollow = async () => {
    if(!currentUserData.onboarded) {
      toast({
        title: "Belum dapat akses",
        description: "Lengkapi dulu profilmu untuk mendapatkan fitur lebih",
        action: <ToastAction altText="Onboarding" onClick={() => router.push("/onboarding")}>Onboarding</ToastAction>
      })
    } else {
      try {
        await followUser(threadUserDataId, currentUserData.id, pathname).then(() => {
          toast({
            duration: 3000,
            title: "Berhasil!",
            description: "Kamu berhasil follow user ini",
          })
        })
      } catch (error) {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Gagal!",
          description: "Kamu sudah follow user ini sebelumnya",
        })
      }
    }
  }
  return (
    <Button disabled={isFollowed} size="sm" className={`w-full flex-1 text-sm font-semibold`} onClick={() => !isFollowed && handleFollow()}>
      {isFollowed ? "Mengikuti" : "Ikuti"}
    </Button>
  )
}

export default FollowButton