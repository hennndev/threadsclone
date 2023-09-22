"use client"
import React from 'react'
import Thread from '@/components/threads/thread'

type PropsTypes = {
  isLoggedIn: boolean
  thread: any
}

const ThreadDetail = ({isLoggedIn, thread}: PropsTypes) => {
  return (
    <div>
      <Thread isLoggedIn={isLoggedIn} data={thread}/>
    </div>
  )
}

export default ThreadDetail