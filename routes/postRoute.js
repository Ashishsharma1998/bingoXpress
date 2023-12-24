const express = require("express");
const { getTimelinePost, getProfilePost, addPost, deletePost, likePost, dislikePost, getLikes } = require("../controllers/postController");
const router = express.Router();


router.get("/timeline",getTimelinePost);
router.get("/profile",getProfilePost);
router.post("/add",addPost);
router.delete("/",deletePost);
router.post("/like",likePost);
router.delete("/dislike/:postId",dislikePost)
router.get("/likes",getLikes);


module.exports = router;
