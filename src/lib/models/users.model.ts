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
    unique: true
  },
  username: {
    type: String,
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
  ]
}, {timestamps: true})


export const Users = mongoose.models.Users || mongoose.model("Users", userSchema)

