import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Thread from '@/components/threads/thread'
import { getThread } from '@/lib/actions/threads.actions'

export async function generateMetadata({params: {threadId}}: {params: {threadId: string}}) {
  const thread = await getThread(threadId)
  return {
    title: `@${thread.userPost.username} · ${thread.text ? `${thread.text}` : "threads"}`
  }
}

const ThreadDetail = async ({params: {threadId}}: {params: {threadId: string}}) => {
  const thread = await getThread(threadId)
  const userLoggedIn = await currentUser()

  console.log(thread.comments)

  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <Thread isLoggedIn={userLoggedIn?.id === thread.userPost.id} key={thread._id} data={thread}/>
      </div>
    </section>
  )
}

export default ThreadDetail