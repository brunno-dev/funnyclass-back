const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    fullname: {
      type: String
    },
    email: {
      type: String
    },
    schoolname: {
      type: Number
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["school", "teacher", "parent"],
      default: "parent"
    },
    registration: {
      type: String
    },
    childid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
