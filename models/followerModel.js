const mongoose = require("mongoose");

//schema design
const followerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
    },
    followUsername: {
      type: String,
      required: [true, "name is required"],
    },
  },
  { timestamps: true }
);

//export
const followerModel = mongoose.model("follower", followerSchema);
module.exports = followerModel;