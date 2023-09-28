import React from 'react'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileForm from '@/components/forms/profileForm'

export const metadata = {
  title: "Onboarding"
}

const Onboarding = async () => {
  const userLoggedin = await currentUser()
  if(!userLoggedin) {
    return null
  }
  const user: UserInfoTypes | null = await fetchUser(userLoggedin.id)
  
  const userData = {
    id: user?.id.toString() || userLoggedin.id,
    image: user?.image.toString() || userLoggedin?.imageUrl,
    username: user?.username || userLoggedin?.username || "",
    name: user?.name || userLoggedin?.firstName || "",
    bio: user?.bio || "",
  }
  if(user) {
    revalidatePath("/")
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