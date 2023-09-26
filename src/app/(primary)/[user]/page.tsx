import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import Threads from '@/components/threads/threads'
import { getUserData } from '@/lib/actions/user.actions'
import ProfileHeader from '@/components/profile/profileHeader'
import { fetchUser } from '@/lib/actions/user.actions'
import { getThreads } from '@/lib/actions/threads.actions'


export async function generateMetadata({params: {user}}: {params: {user: string}}) {
  const userData = await getUserData(user)
  if(!userData) {
    return {
      title: "User not found"
    }
  }
  return {
    title: `@${user}`
  }
}

const Profile = async ({params: {user}}: {params: {user: string}}) => {
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const currentUserDataLoggedIn: UserInfoTypes | null = await fetchUser(userLoggedIn.id) //user login
  const userData = await getUserData(user) //user by pathname
  if(!userData) {
    notFound()
  }
  const threads = await getThreads(userData._id.toString())
  
  let currentUserData = {
    id: currentUserDataLoggedIn?.id, 
    name: currentUserDataLoggedIn?.name ,
    username: currentUserDataLoggedIn?.username ,
    image: currentUserDataLoggedIn?.image,
    onboarded: currentUserDataLoggedIn?.onboarded || false
  }


  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <ProfileHeader 
          user={userData}
          isLoggedIn={userLoggedIn.id} 
          userLoggedInData={currentUserData}/> 
        {threads.length > 0 ? (
          <Threads 
            data={threads}
            userLoggedInId={userLoggedIn.id.toString()} 
            currentUserData={currentUserData as UserInfoTypes}/>
        ) : (
          <div className="flex-center">
            <p className="text-sm">Belum ada thread yang dibuat</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile