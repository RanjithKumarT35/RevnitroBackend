const User = require("./usermodel");
const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    authorIsAdmin: {
      type: Boolean,
      default: false,
    },
    authorProfilePic: {
      type: String,
    },
    authorIdentity: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    highlightedContent: {
      type: String,
      required: true,
    },
    comments: [
      {
        commenterName: {
          type: String,
        },
        commenterProfilePic: {
          type: String,
          default: "",
        },
        commenterIdentity: {
          type: String,
        },
        commenterIsAdmin: {
          type: Boolean,
          default: false,
        },
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    collection: "Thread",
  }
);
module.exports = mongoose.model("Thread", threadSchema);
