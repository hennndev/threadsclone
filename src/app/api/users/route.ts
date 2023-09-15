import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { Users } from "@/lib/models/users.model";

export async function GET() {
  const userLoggedIn = await currentUser()
  try {
    const user = await Users.findOne({id: userLoggedIn?.id})
    return NextResponse.json({
      message: "success",
      user: {
        id: user._id,
        username: user.username,
        image: user.image.imageUrl
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: "error",
    })
  }
}