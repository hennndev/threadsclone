import { Post } from "@/lib/models/threads.model"
import { connectDB } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  try {
    const dataPosts = await Post.find({}).sort({createdAt: -1})
    return NextResponse.json({
      message: "Success get posts",
      data: dataPosts
    }, {status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: "Failed get posts"
    }, {status: 400})
  }
}


export async function POST(req: Request) {
  await connectDB()

  try {
    const newPost = await req.json()
    await Post.create(newPost)
    return NextResponse.json({
      message: "Success create new post"
    }, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: "Failed create new post"
    }, {status: 400})
  }
}