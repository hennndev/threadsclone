import React from 'react'
import Thread from './thread'

type PropsTypes = {
  data: ThreadsTypes[]
}

const Threads = ({data}: PropsTypes) => {
  return (
    <section className="flex flex-col">
      {data.map((data) => (
        <Thread key={data._id} data={data}/>
      ))}
    </section>
  )
}

export default Threads