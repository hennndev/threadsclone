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
  const userLoggedIn: any = await currentUser()
  const currentUserDataLoggedIn: UserInfoTypes | null = await fetchUser(userLoggedIn.id) //user login
  const userData = await getUserData(user) //user by pathname
  const threads = await getThreads(userData._id.toString())
  
  let currentUserData = {
    id: currentUserDataLoggedIn?.id || userLoggedIn.id,
    name: currentUserDataLoggedIn?.name || userLoggedIn.firstName,
    username: currentUserDataLoggedIn?.username || userLoggedIn.username,
    image: currentUserDataLoggedIn?.image || userLoggedIn.imageUrl,
    onboarded: currentUserDataLoggedIn?.onboarded || false
  }

  if(!userData) {
    notFound()
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
            data={threads} //threads data
            userLoggedInId={userLoggedIn.id.toString()} //id user login
            currentUserData={userData as UserInfoTypes}/> //user data login dari database
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