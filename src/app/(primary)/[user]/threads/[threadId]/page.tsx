import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Thread from '@/components/threads/thread'
import Threads from '@/components/threads/threads'
import { fetchUser } from '@/lib/actions/user.actions'
import { getThread } from '@/lib/actions/threads.actions'

export async function generateMetadata({params: {threadId}}: {params: {threadId: string}}) {
  const thread: ThreadsTypes = await getThread(threadId)
  return {
    title: `@${thread.userPost.username} · ${thread.text ? `${thread.text}` : "threads"}`
  }
}

const ThreadDetail = async ({params: {threadId}}: {params: {threadId: string}}) => {
  const thread: any = await getThread(threadId)
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const user: UserInfoTypes | null = await fetchUser(userLoggedIn.id)
  
  let userData = {
    id: user?.id,
    name: user?.name, 
    username: user?.username,
    image: user?.image,
    onboarded: user?.onboarded 
  }

  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <Thread 
          data={thread} //thread data from mapping
          currentUserData={userData as UserInfoTypes} //user data login dari database
          isCurrentUser={thread.userPost.id === userLoggedIn.id}/> 
        <Threads 
            data={thread.comments} 
            userLoggedInId={userLoggedIn.id.toString()} 
            currentUserData={userData as UserInfoTypes}/> 
      </div>
    </section>
  )
}

export default ThreadDetail