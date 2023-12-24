const express = require("express");
const { getComment, addComment } = require("../controllers/commentController");
const router = express.Router();


router.get("/",getComment);
router.post("/",addComment);

module.exports = router;