const mongoose = require("mongoose");

const PostUnique = new mongoose.Schema(
  {
    title: String,
    description: String,
    childparentid: {
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

module.exports = mongoose.model("PostUnique", PostUnique);
