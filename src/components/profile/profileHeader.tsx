import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type PropsTypes = {
  user: any
  userLoggedInData: any
  isLoggedIn: string
}

const ProfileHeader = ({user, userLoggedInData, isLoggedIn}: PropsTypes) => {
  return (
    <div className={`mb-10 pb-10 ${user ? "border-b" : ""} border-gray-200 dark:border-gray-700`}>
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
        <p className="text-gray-400 dark:text-gray-500 text-sm">100 pengikut</p>
      </div>
      {isLoggedIn !== user?.id && user && (
        <div className="flex">
          <Button className="w-full mr-4 font-semibold">Follow</Button>
          <Button variant="outline" className="w-full">Bagikan</Button>
        </div>
      )}
      {!user && (
        <Alert>
          <AlertCircle className="h-4 w-4 !text-red-500" />
          <AlertTitle className="text-red-500">Warning!</AlertTitle>
          <AlertDescription className="mb-3 !text-red-500">
            Lengkapi profilmu untuk mendapatkan akses dan fitur lebih.
          </AlertDescription>
          <Link href="/onboarding">
            <Button size="sm" variant="outline">Complete profile data</Button>
          </Link>
        </Alert>
      )}
    </div>
  )
}

export default ProfileHeader