const mongoose = require("mongoose");

const Child = new mongoose.Schema(
  {
    fullname: {
      type: String
    },
    parentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    registration: {
      type: String
    },
    parent: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Child", Child);
