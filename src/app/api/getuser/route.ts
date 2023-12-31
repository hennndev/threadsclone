import { connectDB } from "@/lib/mongoose"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { Users } from "@/lib/models/users.model"

export async function GET() {
  await connectDB()
  const userLoggedIn = await currentUser()
  try {
    const user = await Users.findOne({id: userLoggedIn?.id})
    return NextResponse.json({
      message: "success",
      user: {
        id: user?._id.toString() || userLoggedIn?.id,
        name: user?.name || userLoggedIn?.firstName,
        username: user?.username || userLoggedIn?.username,
        image: user?.image.imageUrl || userLoggedIn?.imageUrl,
        onboarded: user?.onboarded || false,
        activities: user?.activities.filter((activity: UserActivitiesTypes) => !activity.isRead).length || 0
      }
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      error: "error",
    }, {status: 400})
  }
}