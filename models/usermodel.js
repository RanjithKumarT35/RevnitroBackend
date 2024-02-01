const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userIdentity: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notifications: [
      {
        // Details of mentions by people
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        senderProfilePic: {
          type: String,
        },
        threadId: {
          type: String,
        },
        message: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        // Add more fields as needed
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("user", userSchema);
