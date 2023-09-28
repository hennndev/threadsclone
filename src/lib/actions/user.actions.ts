"use server"
import { connectDB } from "../mongoose"
import { utapi } from "uploadthing/server"
import { revalidatePath } from "next/cache"
import { Users } from "../models/users.model"



//return all users for search page ✅
export async function getUsers(userLoggedInId: string, query?: string): Promise<UserData[]> {
  await connectDB()
  let queries: Record<string, string | Record<string, string> | Record<string, string | any>[]> = {
    id: {$ne: userLoggedInId}
  }
  if(query) {
    queries["$or"] = [
      {name: {$regex: query, $options: "i"}},
      {username: {$regex: query, $options: "i"}},
    ]
  }
  try {
    const users = await Users.find(queries).select("-createdAt -__v -threads -communities -activities")
    return users
  } catch (error: any) {
    throw new Error(`Failed get users: ${error.message}`)
  }
}

// get user info (with exclude some field) ✅
export async function fetchUser(id: string): Promise<UserInfoTypes | null> {
  await connectDB()
  try {
    const user = await Users.findOne({id: id})
    if(user) {
      return {
        id: user._id.toString(),
        name: user.name,
        bio: user.bio,
        username: user.username,
        image: user.image.imageUrl,
        imageKey: user.image.imageKey ? user.image.imageKey : null,
        onboarded: user.onboarded,
        // activities: user.activities.filter((activity: UserActivitiesTypes) => !activity.isRead)
      }
    } else return null
  } catch (error: any) {
    throw new Error(`Failed fetch user: ${error.message}`)    
  }
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



export async function getUserActivities(id: string) {
  await connectDB()
  try {
    const user = await Users.findOne({id: id})
    return user
  } catch (error: any) {
    throw new Error(`Failed get user activities: ${error.message}`)
  }
}


// clear activities = []
export async function clearActivties(id: string) {
  await connectDB()
  try {
    await Users.updateMany({id: id}, {
      "$set": {activities: []}
    }, {multi: true})
    revalidatePath("/activity")
  } catch (error: any) {
    throw new Error(`Failed get user activities: ${error.message}`)
  }
}

// reset status read activities
export async function readAllActivities(id: string) {
  await connectDB()
  try {
    await Users.updateMany({id: id, "activities.isRead": false}, {
      "$set": {"activities.$.isRead": true}
    }, {multi: true})
  } catch (error: any) {
    throw new Error(`Failed get user activities: ${error.message}`)
  }
}

export async function getUserData(username: string) {
  await connectDB()
  try {
    const user = await Users.findOne({username: username}).select("-createdAt -__v -threads")
    return user
  } catch (error: any) {
    throw new Error(`Failed get user: ${error.message}`)
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
    if(path === "/onboarding") {
      await Users.findOneAndUpdate({id: id}, {
        name: name,
        username: username.toLowerCase(),
        image: image,
        bio: bio,
        onboarded: true,
        $push: {activities: {
          text: "Selamat datang user baru, terimakasih sudah mendaftar di threads clone ini. -Hendra-",
        }}
      }, {upsert: true})
      revalidatePath("/")
    } else {
      await Users.updateOne({_id: id}, {
        name: name,
        username: username.toLowerCase(),
        image: image,
        bio: bio,
      })
    }
    if(oldImageKey) {
      await utapi.deleteFiles(oldImageKey)
    }
    if(path !== "/onboarding") {
      revalidatePath(`/${username}`)
    }    
  } catch (error: any) {
    console.log(error)
    throw new Error(`Failed upsert user: ${error.message}`) 
  }
}

// follow user ✅
export async function followUser(id: string, currentUserUsername: string, currentUserId: string, action: string, path: string) {
  await connectDB()
  try {
    if(action === "follow") {
      await Users.updateOne({_id: id, followers: {$ne: currentUserId}}, {
        $push: {
          followers: currentUserId,
          activities: {
            username: currentUserUsername,
            type: "following",
            text: "mengikutimu",
          }
        },
      }, {upsert: true})
    }
    if(action === "unfollow") {
      await Users.updateOne({_id: id}, {
        $pull: {followers: currentUserId}
      }, {upsert: true})
    }
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed follow this user: ${error.message}`) 
  }
}