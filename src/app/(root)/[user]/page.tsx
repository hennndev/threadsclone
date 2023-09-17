import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Threads from '@/components/threads/threads'
import ProfileHeader from '@/components/profile/profileHeader'
import { getUserData, getUsersUsername } from '@/lib/actions/user.actions'


export async function generateMetadata({params: {user}}: {params: {user: string}}) {
  return {
    title: `@${user}`
  }
}

const Profile = async ({params: {user}}: {params: {user: string}}) => {
  const userLoggedIn: any = await currentUser()
  const userData = await getUserData(user)
  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <ProfileHeader isLoggedIn={userLoggedIn.id} user={userData}/>
        <Threads isLoggedIn={userLoggedIn.id} data={userData.threads}/>
      </div>
    </section>
  )
}

export default Profile