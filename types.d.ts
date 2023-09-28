interface ThreadTypes {
  _id: string 
  text: string | null 
  userPost: any
  image?: {
    imageKey: string
    imageUrl: string
  } | null 
  community: string | null 
  likes: string[] 
  isCommented: string 
  parentId?: string 
  createdAt: Date 
}

type ThreadsTypes = ThreadTypes & {comments: ThreadTypes[] | string[]}

interface UserTypes {
  _id: string
  id: string
  name: string
  username: string
  bio: string
  onboarded: boolean
  threads: ThreadsTypes[]
  createdAt: Date
  communities: string[]
  image: {
    imageKey: string
    imageUrl: string
  }
}


interface UserData {
  _id: string
  id: string
  name: string
  username: string
  image: {
    imageKey?: string
    imageUrl: string
  }
  bio: string
  followers?: any,
  onboarded?: boolean
  threads?: any
  communities?: any
  activities?: any
}

interface UserInfoTypes {
  id: string
  name: string
  username: string
  bio: string
  image: string 
  imageKey?: string | null
  onboarded?: boolean
  activities?: number | UserActivitiesTypes[]
}

interface UserActivitiesTypes {
  user: any
  routeLink?: string
  text: string
  isGreeting?: boolean
  isRead: boolean
  createdAt: Date 
}