"use server"
import { connectDB } from "../mongoose"
import { Users } from "../models/users.model"
import { Threads } from "../models/threads.model"


export async function getThreads() {
  await connectDB()
  try {
    const threads = await Threads.find({}).sort({createdAt: -1}).select("-__v").populate(["userPost"])
    return threads
  } catch (error: any) {
    throw new Error(`Failed get threads: ${error.message}`)
  }
}

export async function uploadThread({text, userId, image = null, isCommented}: {
  text: string | null
  userId: string
  image: {
    imageKey: string
    imageUrl: string
  } | null,
  isCommented: string
}): Promise<void> {
  await connectDB()
  try {
    const newThread = await Threads.create({
      text,
      userPost: userId,
      image,
      isCommented
    })
    await Users.updateOne({_id: userId}, {
      $push: {threads: newThread._id}
    })
  } catch (error: any) {
    throw new Error(`Failed upload new thread: ${error.message}`)
  }
}


export async function updateThread({text, threadId}: {text: string, threadId: string}) {
  await connectDB()
  try { 
    await Threads.updateOne({_id: threadId}, {
      text: text
    })
  } catch (error: any) {
    throw new Error(`Failed update thread: ${error.message}`)
  }
}

export async function deleteThread({userId}: {userId: string}): Promise<void> {
  await connectDB()
  try {
    await Threads.findByIdAndDelete(userId)
  } catch (error: any) {
    throw new Error(`Failed delete thread: ${error.message}`)
  }
}