import React from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type PropsTypes = {
  children: React.ReactNode
  userData: any
  isLoggedIn: boolean
}

const HoverUser = ({children, userData, isLoggedIn}: PropsTypes) => {

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    alert("HELLO WORLD")
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={userData.image.imageUrl} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{userData.name}</h1>
            <h4 className="text-sm mb-1">@{userData.username}</h4>
            <p className="text-sm mb-1">
              {userData.bio}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-2">100 pengikut</p>
            <div className="flex">
              {!isLoggedIn && <Button size="sm" className="w-full text-sm font-semibold mr-2 flex-1">Follow</Button>}
              <Link href={`/${userData.username}`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-sm font-semibold">
                  {isLoggedIn ? "Profilku" : "Visit"}
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