const Comment = require("../models/commentModel");
const jwt = require("jsonwebtoken");


const getComment = async(req,res)=>{
    try {
       const postId = req.query.postId;
       const data  = await Comment.find({postId:postId}).populate("userId");
       const mappedData = data.map((d)=>{
         const {_id:commentId, postId , userId,desc,createdAt} = d;
         return {
            commentId,
            postId,
            userId,
            desc,
            name:userId?.name,
            profilePic:userId?.profilePic,
            userId:userId?._id,
            createdAt
         };
       });
       return res.status(200).json(mappedData);
    } catch (error) {
        return res.status(500).json("something went wrong!!!");
    }
}



const addComment = async(req,res)=>{
    try {
      const {postId , desc} = req.body;
      const token = req.cookies.token;
      const {userId} = jwt.verify(token,"secretKey");
      if(!userId){
        return {message:"user is not authenticated!"};
      }
     
      await Comment.create({
        postId,
        userId,
        desc
      });

      return res.status(201).json("user has commented");

    } catch (error) {
      return res.status(500).json("something went wrong!!!"); 
    }
}


module.exports={
    getComment,
    addComment
}