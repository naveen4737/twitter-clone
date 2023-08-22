const express = require("express");
const {
  postTweet,
  fetchTweet,
  myTweet,
  editTweet,
  deleteTweet
} = require("../controllers/tweetController");
const { auth } = require("../middlewares/auth")

const router = express.Router();

// create tweet
router.post("/create", auth, postTweet);

// fetch all the tweets in current user's timeline
router.get("/fetch", auth, fetchTweet);

// fetch all the tweets done by current user
router.get("/mytweets", auth, myTweet);

// edit tweet
router.put("/edit", auth, editTweet);

// delete tweet
router.delete("/:id", auth, deleteTweet);

module.exports = router;