const express = require("express");
const router = express.Router();
const {followUser,getAllFollowings,unfollowUser, getUser, updateUser} = require("../controllers/userController");


router.put("/follow/:id",followUser);
router.put("/unfollow/:id",unfollowUser);
router.get("/followings",getAllFollowings);
router.get("/:userId",getUser);
router.put("/update",updateUser);

module.exports = router;