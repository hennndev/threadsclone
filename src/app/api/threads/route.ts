import { Threads } from "@/lib/models/threads.model";
import { Users } from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDB()
  try {
    const threads = await Threads.find({}).sort({createdAt: "desc"}).select("-__v")
      .populate({ path: "userPost", model: Users, select: "-__v -id -createdAt -onboarded -threads -communities"})
      .populate({path: "likes", model: Users, select: "-__v -id -createdAt -onboarded -threads -communities"})
      .populate({
        path: "comments",
        populate: [
          {
            path: "userPost",
            model: Users,
            select: "-__v -id -createdAt -onboarded -threads -communities"
          },
          {
            path: "likes",
            model: Users,
            select: "-__v -id -createdAt -onboarded -threads -communities"
          },
        ]
      })
    return NextResponse.json({
      message: "Success get data",
      data: threads
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      error: "Failed get data"
    })
  }
}