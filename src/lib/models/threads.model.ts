import mongoose from 'mongoose'

const Schema = mongoose.Schema

const threadSchema = new Schema({
  text: {
    type: String,
  },
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  image: {
    imageKey: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    default: null
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  //if thread have a parentId, actually this thread as a comment from another thread or thread parent
  parentId: {
    type: String
  },
  isCommented: {
    type: String,
    enum: ["everyone", "followers"],
    default: "everyone"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threads"
    }
  ]
})


export const Threads = mongoose.models.Threads || mongoose.model("Threads", threadSchema)

