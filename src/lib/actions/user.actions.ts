"use server"
import { connectDB } from "../mongoose"
import { utapi } from "uploadthing/server"
import { revalidatePath } from "next/cache"
import { Users } from "../models/users.model"
import { currentUser } from "@clerk/nextjs"
import { Threads } from "../models/threads.model"

export async function UserUploadLink() {
  const user = await currentUser()
  return user
}


export async function getUsersUsername() {
  await connectDB()
  try {
    const users = await Users.find({}).select("username")
    return users
  } catch (error: any) {
    throw new Error(`Something new error: ${error.message}`)
  }
}

export async function getUserData(username: string) {
  await connectDB()
  try {
    const user = await Users.findOne({username: username}).populate({
      path: "threads", 
      model: Threads,
      options: {sort: {createdAt: "desc"}},
      populate: {
        path: "userPost",
        model: Users
      }
    })
    return user
  } catch (error: any) {
    throw new Error(`Failed get user: ${error.message}`)
  }
}

export async function checkUserExist(id: string): Promise<{
  id: string
  image: {
    imageKey?: string
    imageUrl: string
  } | null
  username: string
  name: string
  bio: string
  onboarded: boolean
} | null> {
  await connectDB()
  try {
    const user = await Users.findOne({id: id})
    if(user) {
      return {
        id: user?._id.toString(),
        image: user?.image,
        username: user?.username,
        name: user?.name,
        bio: user?.bio,
        onboarded: user?.onboarded
      }
    } else {
      return null
    }
  } catch (error: any) {
    throw new Error(`Something new error: ${error.message}`)
  }
}




export async function fetchUser(id: string) {
  await connectDB()
  try {
    const user = await Users.findOne({id: id})
    if(user) {
      return {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        image: user.image.imageUrl,
        onboarded: user.onboarded
      }
    } else return null
  } catch (error: any) {
    throw new Error(`Failed fetch user: ${error.message}`)    
  }
}


export async function upsertUser({id, name, username, image, bio, path, oldImageKey = null}: {
  id: string
  name: string
  username: string
  image: {
    imageKey?: string
    imageUrl: string
  }
  bio: string
  path: string
  oldImageKey?: string | null
}) {
  await connectDB()
  try {
    const user = await Users.findOneAndUpdate({id: id}, {
      name: name,
      username: username.toLowerCase(),
      image,
      bio,
      onboarded: true
    }, {upsert: true})

    if(path === "/profile/edit") {
      revalidatePath(path)
    }
    
  } catch (error: any) {
    throw new Error(`Failed upsert user: ${error.message}`) 
  }
}