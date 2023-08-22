const userModel = require("../models/userModel");
const followerModel = require("../models/followerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// login controller
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: username, id: existingUser._id },
      JWT_SECRET_KEY
    );

    console.log("login successfull")
    res.status(201).json({ success: true, user: existingUser, token: token, message: "Login successfull" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username+", "+password+" "+hashedPassword)
    const newUser = new userModel({ username: username, password: hashedPassword });
    const result = await newUser.save();

    const token = jwt.sign({ username: result.username, id: result._id },
      JWT_SECRET_KEY
    );

    res.status(201).json({
      success: true,
      user: result,
      token: token
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const followUserController = async (req, res) => {
  try {
    const { username, usernameFollow } = req.body;

    const alreadyFollows = await followerModel.findOne({
      username: username, followUsername: usernameFollow
    });
    if (alreadyFollows) {
      return res.status(404).json({ success: false, message: "Already followed" });
    }

    const newFollower = new followerModel({ username: username, followUsername: usernameFollow });
    const result = await newFollower.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const unfollowUserController = async (req, res) => {
  try {
    const { username, usernameFollow } = req.body;

    const follows = await followerModel.findOneAndRemove({
      username: username, followUsername: usernameFollow
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getFollowedUserController = async (req, res) => {
  console.log("getting follower list")
  try{
    const { username, userId } = req.body;

    console.log(username)
    let followedUsers = await followerModel.find({username: username}).sort({ createdAt: -1 });

    const simplifiedFollowedUsers = followedUsers.map(user => ({
      username: user.followUsername,
    }));

    res.status(201).json({
      success: true,
      following: simplifiedFollowedUsers
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error
    });
  }
};

const getNotFollowingUserController = async (req, res) => {
  console.log("getting not following list")
  try{
    const { username, userId } = req.body;

    const followingUsers = await followerModel.find({ username: username });
    const followingUsernames = followingUsers.map(follower => follower.followUsername);

    const usersNotFollowed = await userModel.find({
      username: { $nin: [username, ...followingUsernames] }
    });

    const simplifiedNotFollowingUsers = usersNotFollowed.map(user => ({
      username: user.username,
    }));

    res.status(200).json({
      success: true,
      notfollowing: simplifiedNotFollowingUsers
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error
    });
  }
};

const getAllUsers = async (req, res) => {
  try{
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });

  }
};

module.exports = {
  loginController,
  registerController,
  followUserController,
  unfollowUserController,
  getFollowedUserController,
  getNotFollowingUserController
};