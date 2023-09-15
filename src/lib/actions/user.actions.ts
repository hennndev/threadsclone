"use server"
import { connectDB } from "../mongoose"
import { utapi } from "uploadthing/server"
import { revalidatePath } from "next/cache"
import { Users } from "../models/users.model"
import { currentUser } from "@clerk/nextjs"

export async function UserUploadLink() {
  const user = await currentUser()
  return user
}

export async function checkUserExist(id: string): Promise<Record<string, string> | null> {
  await connectDB()
  try {
    const user = await Users.findOne({id: id})
    return user
  } catch (error: any) {
    throw new Error(`Something new error: ${error.message}`)
  }
}




export async function fetchUser(id: string) {
  await connectDB()

  try {
    const user = await Users.findOne({id: id})
    return user
  } catch (error: any) {
    throw new Error(`Failed fetch user: ${error.message}`)    
  }
}


export async function upsertUser({id, name, username, image, bio, path, oldImageKey = null}: {
  id: string
  name: string
  username: string
  image: {
    imageKey: string
    imageUrl: string
  }
  bio: string
  path: string
  oldImageKey?: string | null
}): Promise<void> {
  await connectDB()
  try {
    await Users.findOneAndUpdate({id: id}, {
      name: name.toLowerCase(),
      username: username.toLowerCase(),
      image,
      bio,
      onboarded: true
    }, {upsert: true}).then(async() => {
      // DELETE IMAGE UPLOADTHING IF oldImageKey true
      if(oldImageKey) {
        await utapi.deleteFiles(oldImageKey)
      }
    })

    if(path === "/profile/edit") {
      revalidatePath(path)
    }
    
  } catch (error: any) {
    throw new Error(`Failed upsert user: ${error.message}`) 
  }
}