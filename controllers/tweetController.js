// const userModel = require("../models/userModel");
const tweetModel = require("../models/tweetModel");
const followerModel = require("../models/followerModel");

// login callback
const postTweet = async (req, res) => {
  console.log("posting tweet")
  try {
    const { username, userId, text } = req.body;
    
    const newUser = new tweetModel({ username: username, text: text });
    const result = await newUser.save();
    console.log(result);

    res.status(201).json({
      success: true,
      message: "Tweet Posted"
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
      message: "Something went wrong"
    });
  }
};

const editTweet = async (req, res) => {
  console.log("editing tweet")
  try {
    const { username, userId, text, id } = req.body;

    const existingTweet = await tweetModel.findOne({ username: username, _id: id });
    if (!existingTweet) {
      return res.status(400).json({ success: false, message: "No Tweet" });
    }


    const updatedTweet = await tweetModel.findByIdAndUpdate(id, { text: text }, { new: true });

    res.status(201).json({
      success: true,
      tweet: updatedTweet,
      message: "Tweet Edited"
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
      message: "Something went wrong"
    });
  }
};

const deleteTweet = async (req, res) => {
  console.log("deleting tweet")
  try {
    const { username, userId } = req.body;
    console.log(req.params)
    const {id} = req.params;

    const existingTweet = await tweetModel.findOne({ username: username, _id: id });
    if (!existingTweet) {
      return res.status(400).json({ success: false, message: "No Tweet" });
    }

    const deletedTweet = await tweetModel.findByIdAndRemove(id);

    res.status(200).json({
      success: true,
      message: "Tweet deleted"
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
      message: "Something went wrong"
    });
  }
};

// Fetch all the tweets for the user
const fetchTweet = async (req, res) => {
  try {
    const { username, page } = req.body;

    // const newUser = new userModel(req.body);
    // await newUser.save();

    const userUsername = username;
    const pageSize = 10;
    const currentPage = 1;

    let tweets = await tweetModel.aggregate([
      {
        $lookup: {
          from: 'followers',
          localField: 'username',
          foreignField: 'followUsername',
          as: 'following',
        },
      },
      {
        $match: {
          $or: [
            { username: userUsername },
            { 'following.username': userUsername },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])

    const simplifiedTweets = tweets.map(tweet => ({
      id: tweet._id,
      username: tweet.username,
      text: tweet.text,
      createdAt: tweet.createdAt
    }));

    res.status(201).json({
      success: true,
      tweets: simplifiedTweets
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const myTweet = async (req, res) => {
  try {
    const { username } = req.body;
    let tweets = await tweetModel.find({username: username}).sort({ createdAt: -1 });

    const simplifiedTweets = tweets.map(tweet => ({
      id: tweet._id,
      username: tweet.username,
      text: tweet.text,
      createdAt: tweet.createdAt
    }));

    res.status(201).json({
      success: true,
      tweets: simplifiedTweets
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { postTweet, fetchTweet, myTweet, editTweet, deleteTweet };