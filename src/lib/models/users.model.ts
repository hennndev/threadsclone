import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    imageKey: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  bio: {
    type: String
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threads"
    }
  ],
  onboarded: {
    type: Boolean,
    default: false
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community"
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})


export const Users = mongoose.models.Users || mongoose.model("Users", userSchema)

