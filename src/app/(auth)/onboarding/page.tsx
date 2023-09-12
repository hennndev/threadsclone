import React from 'react'
import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/backend/dist/types/api'

interface UserInfoTypes {
  _id: string
  username: string
  name: string
  bio: string
}


export const metadata = {
  title: "Onboarding"
}

const Onboarding = async () => {

  const user: any = await currentUser()

  // let userInfo = {} as  UserInfoTypes

  const userData = {
    id: user.id,
    // @ts-ignore
    objectId: "test id",
    // @ts-ignore
    image: user?.imageUrl,
    // @ts-ignore
    username: user?.username,
    // @ts-ignore
    name: user?.firstName,
    bio: ""
  }

  return (
    <main className="flex flex-col max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-gray-100 text-3xl font-bold">Onboarding</h1>
      <p className="mt-3 text-gray-100">Complete your profile to use the threads</p>

      <section className="mt-5 p-7 border border-[#2b2b2b] rounded-md">
        <AccountProfile
          userData={userData}
          btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default Onboarding