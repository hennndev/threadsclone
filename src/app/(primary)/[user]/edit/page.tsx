import React from 'react'
import { MoveLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileForm from '@/components/forms/profileForm'
import EditProfileSection from '@/components/profile/editProfileSection'

export function metadata() {
  return {
    title: "Edit Profile"
  }
}

const EditProfile = async () => {
  const userLoggedin = await currentUser()
  if(!userLoggedin) {
    return null
  }
  const user: UserInfoTypes | null = await fetchUser(userLoggedin.id)
  if(!user) {
    notFound()
  }
  const userData = {
    id: user?.id.toString(),
    image: user?.image.toString(),
    imageKey: user?.imageKey,
    username: user?.username,
    name: user?.name,
    bio: user?.bio,
  }

  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <EditProfileSection userData={userData}/>
      </div>
    </section>
  )
}

export default EditProfile