import React from 'react'
import Thread from './thread'

type PropsTypes = {
  data: ThreadsTypes[]
  userLoggedInId: string
  currentUserData: UserInfoTypes
}

const Threads = ({userLoggedInId, data, currentUserData}: PropsTypes) => {
  return (
    <section className="flex flex-col">
      {data.map((data) => (
        <Thread 
          key={data._id.toString()} 
          data={data} //thread data from mapping
          currentUserData={currentUserData} //user data login dari database
          isCurrentUser={data.userPost.id === userLoggedInId}/> //untuk mengecek apakah thread dibuat oleh user login saat ini
      ))}
    </section>
  )
}

export default Threads