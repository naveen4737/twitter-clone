

const express = require("express");
const {
  loginController,
  registerController,
  followUserController,
  unfollowUserController,
  getFollowedUserController,
  getNotFollowingUserController
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth")

const router = express.Router();

// login user
router.post("/login", loginController);

// register user
router.post("/register", registerController);

// follow user
router.put("/follow", auth, followUserController);

// unfollow user
router.put("/unfollow", auth, unfollowUserController);

// get list of users followed by current user
router.get("/followedusers", auth, getFollowedUserController);;

// get list of users not followed by current user
router.get("/notfollowingusers", auth, getNotFollowingUserController);

module.exports = router;
