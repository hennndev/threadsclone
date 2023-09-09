import React from 'react'
import Image from 'next/image'
import { RiMoreFill, RiHeart3Line, RiSendPlaneLine  } from 'react-icons/ri'
import { BiComment } from 'react-icons/bi'

const Post = () => {
  return (
    <div className="flex pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
      <div className="relative w-[30px] h-[30px] rounded-full mr-4">
        <Image 
          fill
          sizes="auto" 
          src="https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png" 
          alt="sample" 
          quality={75}
          className="w-full h-full object-cover rounded-full"/>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-between">
          <h2 className="text-primary-light dark:text-primary-dark font-semibold">Hendra</h2>
          <div className="flexx">
            <p className="text-sm text-gray-500 mr-3 font-medium">9 Jam</p>
            <RiMoreFill/>
          </div>
        </div>
        <div className="mt-2">
          <p className="leading-[1.5] text-primary-light dark:text-primary-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nobis neque perferendis veritatis necessitatibus ut magnam blanditiis unde vero ducimus.</p>
        </div>
        <div className="flexx space-x-3 mt-3">
          <RiHeart3Line className="text-primary-light dark:text-primary-dark text-xl"/>
          <BiComment className="text-primary-light dark:text-primary-dark text-xl"/>
          <RiSendPlaneLine className="text-primary-light dark:text-primary-dark text-xl"/>
        </div>
        <div className="flexx text-gray-500 dark:text-gray-400 space-x-2 mt-2">
          <p>6 Balasan</p>
          <span>&middot;</span>
          <p>12 Suka</p>
        </div>
      </div>
    </div>
  )
}

export default Post