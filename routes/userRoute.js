const express = require("express");
const router = express.Router();
const {followUser,getAllFollowings,unfollowUser, getUser} = require("../controllers/userController");


router.put("/follow/:id",followUser);
router.put("/unfollow/:id",unfollowUser);
router.get("/followings",getAllFollowings);
router.get("/:userId",getUser);

module.exports = router;