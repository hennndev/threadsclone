
type ThreadTypes = {
  _id: string
  text?: string | null
  userPost: any
  image?: {
    imageKey: string
    imageUrl: string
  } | null
  community: string | null
  likes: string[]
  createdAt: Date
  parentId?: string
  isCommented: string
}

type ThreadsTypes = ThreadTypes & {
  comments: ThreadTypes[]
}