import React from 'react'
import Thread from './thread'
import Link from 'next/link'

type PropsTypes = {
  data: ThreadsTypes[]
  isLoggedIn: string
}

const Threads = ({data, isLoggedIn}: PropsTypes) => {
  return (
    <section className="flex flex-col">
      {data.map((data) => (
        <Link href={`/${data.userPost.username}/threads/${data._id}`} key={data._id} passHref={true}>
          <Thread isLoggedIn={isLoggedIn === data.userPost.id} key={data._id} data={data}/>
        </Link>
      ))}
    </section>
  )
}

export default Threads