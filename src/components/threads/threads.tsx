import React from 'react'
import Thread from './thread'

type PropsTypes = {
  data: ThreadsTypes[]
  isLoggedIn: string
}

const Threads = ({data, isLoggedIn}: PropsTypes) => {
  return (
    <section className="flex flex-col">
      {data.map((data) => (
        <Thread isLoggedIn={isLoggedIn === data.userPost.id} key={data._id} data={data}/>
      ))}
    </section>
  )
}

export default Threads