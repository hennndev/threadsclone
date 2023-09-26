import React from "react"
import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import FollowButton from "@/components/shared/followButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
  
type PropsTypes = {
  children: React.ReactNode
  userData: UserData 
  currentUserData: UserInfoTypes
  isCurrentUser: boolean
}

const HoverUser = ({children, userData, currentUserData, isCurrentUser}: PropsTypes) => {
  const isFollowed = Boolean(userData?.followers.find((_id: string) => _id.toString() === currentUserData.id))
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-64 -ml-5 lg:md:w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={userData?.image.imageUrl} />
            <AvatarFallback>{userData?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex">
              <h1 className="text-lg font-semibold mr-2">{userData?.name}</h1>
              <BadgeCheck className="w-5 text-blue-600"/>
            </div>
            <h4 className="text-sm mb-1">@{userData?.username}</h4>
            <p className="text-sm mb-1">{userData?.bio}</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-2">{userData?.followers.length} pengikut</p>
            <div className="flex">
              {!isCurrentUser ? (
                <FollowButton 
                  classes="w-full flex-1"
                  isFollowed={isFollowed} 
                  currentUserData={currentUserData} 
                  userDataId={userData?._id.toString()}/> 
              ) : null}
              <Link href={`/${userData?.username}`} className="flex-1 ml-3">
                <Button size="sm" variant="outline" className="w-full text-sm font-semibold">
                  {isCurrentUser ? "Profilku" : "Visit"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoverUser