const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    author: String,
    description: String,
    hashtags: String,
    image: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", Post);
