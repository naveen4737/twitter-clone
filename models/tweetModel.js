const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    text: {
      type: String,
      required: [true, "text is required"],
    },
  },
  { timestamps: true }
);

const tweetModel = mongoose.model("tweets", tweetSchema);
module.exports = tweetModel;