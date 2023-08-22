const mongoose = require("mongoose");

//schema design
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

//export
const tweetModel = mongoose.model("tweets", tweetSchema);
module.exports = tweetModel;