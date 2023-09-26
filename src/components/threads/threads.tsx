import React from 'react'
import Thread from '@/components/threads/thread'

type PropsTypes = {
  data: ThreadsTypes[]
  userLoggedInId: string
  currentUserData: UserInfoTypes
}

const Threads = ({data, userLoggedInId, currentUserData}: PropsTypes) => {
  return (
    <section className="flex flex-col">
      {data.map((data) => (
        <Thread 
          key={data._id.toString()} 
          data={data} 
          currentUserData={currentUserData} 
          isCurrentUser={data.userPost.id === userLoggedInId}/> 
      ))}
    </section>
  )
}

export default Threads