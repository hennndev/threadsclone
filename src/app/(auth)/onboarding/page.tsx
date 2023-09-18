import React from 'react'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { checkUserExist } from '@/lib/actions/user.actions'
import ProfileForm from '@/components/forms/profileForm'

interface UserInfoTypes {
  id: string
  image: {
    imageKey?: string
    imageUrl: string
  } | null
  username: string
  name: string
  bio: string
  onboarded: boolean
}


export const metadata = {
  title: "Onboarding"
}

const Onboarding = async () => {

  const user: any = await currentUser()
  const userDB: UserInfoTypes | null = await checkUserExist(user.id)
  
  const userData = {
    id: userDB?.id || user.id,
    image: userDB?.image?.imageUrl || user?.imageUrl,
    username: userDB?.username || user?.username,
    name: userDB?.name || user?.firstName,
    bio: userDB?.bio || "",
    onboarded: userDB?.onboarded || false
  }
  if(userDB) {
    redirect("/")
  }

  return (
    <main className="flex flex-col max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-gray-100 text-3xl font-bold">Onboarding</h1>
      <p className="mt-3 text-gray-100">Complete your profile to use the threads</p>

      <section className="mt-5 p-7 border border-[#2b2b2b] rounded-md">
        <ProfileForm
          userData={userData}
          btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default Onboarding