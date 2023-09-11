import React from 'react'
import Posts from '@/components/posts/posts'
import CreateThread from '@/components/posts/createThread'
import { currentUser } from '@clerk/nextjs'

const Home = async () => {

  const user = await currentUser()
  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <CreateThread/>
        <Posts/>
      </div>
    </section>
  )
}

export default Home