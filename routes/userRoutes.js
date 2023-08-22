

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

//router object
const router = express.Router();

//routers
router.post("/login", loginController);

router.post("/register", registerController);

router.put("/follow", auth, followUserController);
// username of the user to follow should be passed

router.put("/unfollow", auth, unfollowUserController);
// username of the user to unfollow should be passed



router.get("/followedusers", auth, getFollowedUserController);;
router.get("/notfollowingusers", auth, getNotFollowingUserController);

module.exports = router;
