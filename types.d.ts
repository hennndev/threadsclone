
interface ThreadTypes {
  _id: string 
  text: string | null 
  userPost: UserPostTypes
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
  comments: ThreadTypes[]
}
type ThreadsTypes = ThreadTypes & CommentsType

interface UserPostTypes {
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