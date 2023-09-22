
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
interface CommentsType {
  
}
type ThreadsTypes = ThreadTypes & {
  comments: ThreadTypes[]
}






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

}

interface UserInfoTypes {
  id: string
  name: string
  username: string
  image: string
  onboarded: boolean
}