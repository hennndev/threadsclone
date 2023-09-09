import React from 'react'
import Posts from '@/components/posts/posts'

const page = () => {
  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <Posts/>
      </div>
    </section>
  )
}

export default page