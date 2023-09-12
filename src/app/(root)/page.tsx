import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Posts from '@/components/posts/posts'
import CreateThread from '@/components/posts/createThread'


export const metadata = {
  title: "Beranda"
}

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