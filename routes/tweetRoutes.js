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

router.post("/create", auth, postTweet);
router.get("/fetch", auth, fetchTweet);
router.get("/mytweets", auth, myTweet);
router.put("/edit", auth, editTweet);
router.delete("/:id", auth, deleteTweet);

module.exports = router;