"use server"
import { connectDB } from "../mongoose"
import { utapi } from 'uploadthing/server'
import { revalidatePath } from "next/cache"
import { Users } from "../models/users.model"
import { Threads } from "../models/threads.model"

// get threads ✅
export async function getThreads(userId: null | string = null): Promise<Array<any>> {
  await connectDB()
  // limit
  // skip
  let queries: Record<string, string | Record<string, boolean>> = {
    parentId: {$exists: false}
  }
  if(userId) {
    queries.userPost = userId
  }
  try {
    const threads = await Threads.find(queries).sort({createdAt: "desc"}).select("-__v")
      .populate({ path: "userPost", model: Users, select: "-__v -createdAt -onboarded -threads -communities -activities"})
      .populate({path: "likes", model: Users, select: "-__v -createdAt -onboarded -threads -communities -activities"})
    return threads
  } catch (error: any) {
    throw new Error(`Failed get threads: ${error.message}`)
  }
}

//get thread ✅
export async function getThread(threadId: string): Promise<any> {
  await connectDB()
  try {
    const thread = await Threads.findOne({_id: threadId}).select("-__v")
      .populate({
        path: "userPost",
        model: Users,
        select: "-__v -createdAt -onboarded -threads -communities"
      })
      .populate({
        path: "likes", 
        model: Users, 
        select: "-__v -createdAt -onboarded -threads -communities -activities"
      })
      .populate({
        path: "comments",
        model: Threads,
        options: {sort: {createdAt: "asc"}},
        populate: [
          {
            path: "userPost",
            model: Users,
            select: "-__v -createdAt -onboarded -threads -communities -activities"
          },
          {
            path: "likes", 
            model: Users, 
            select: "-__v -createdAt -onboarded -threads -communities -activities"
          }
        ]
      })
    
      return thread
  } catch (error: any) {
    throw new Error(`Failed get thread: ${error.message}`)   
  }
}


// upload new thread ✅
export async function uploadThread({userId, path, ...dataParam}: {
  text: string | null
  userId: string
  image: {
    imageKey: string
    imageUrl: string
  } | null,
  isCommented: string
  parentId?: string
  path: string
}) {
  await connectDB()
  try {
    const newThread = await Threads.create({
      userPost: userId,
      ...dataParam
    })
    await Users.updateOne({_id: userId}, {
      $push: {threads: newThread._id}
    })
    if(dataParam.parentId) {
      await Threads.updateOne({_id: dataParam.parentId}, {
        $push: {comments: newThread._id}
      })
    }
    if(path !== "/" && path !== '/[user]') {
      revalidatePath("/")
    } else {
      revalidatePath(path)
    }
  } catch (error: any) {
    throw new Error(`Failed upload new thread: ${error.message}`)
  }
}


export async function editThread({threadId, path, oldImageKey, ...dataParam}: {
  text: string | null
  threadId: string
  image: {
    imageKey?: string
    imageUrl: string
  } | null,
  isCommented: string
  parentId?: string
  oldImageKey: string | null
  path: string
}): Promise<void> {
  await connectDB()
  try {
    await Threads.updateOne({_id: threadId}, {
      ...dataParam
    })
    if(oldImageKey) {
      await utapi.deleteFiles(oldImageKey)
    }
    if(path !== "/" && path !== '/[user]') {
      revalidatePath("/")
    } else {
      revalidatePath(path)
    }

  } catch (error: any) {
    throw new Error(`Failed upload new thread: ${error.message}`)
  }
}




export async function deleteThread(threadId: string, userId: string, imageKey: string | null, path: string): Promise<void> {
  await connectDB()
  try {
    await Threads.findByIdAndDelete(threadId)
    await Threads.deleteMany({parentId: threadId})
    await Users.updateOne({_id: userId}, {
      $pull: {threads: threadId}
    })
    if(imageKey) {
      await utapi.deleteFiles(imageKey)
    }
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed delete thread: ${error.message}`)
  }
}

// like thread ✅
export async function likeThread(threadId: string, currentUserId: string, likeStatus: string, path: string) {
  await connectDB()
  try {
    if(likeStatus === "like") {
      await Threads.updateOne({_id: threadId, likes: { $ne: currentUserId }}, {
        $push: {likes: currentUserId}
      }, {upsert: true})
    }
    if(likeStatus === "dislike") {
      await Threads.updateOne({_id: threadId}, {
        $pull: {likes: currentUserId}
      }, {upsert: true})
    } 
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed follow this user: ${error.message}`) 
  }
}