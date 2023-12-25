const jwt = require("jsonwebtoken");
const Post  = require("../models/postModel");
const User = require("../models/userModel");
const Like = require("../models/likeModel");


const getTimelinePost = async(req,res)=>{
  try {
   
    const token = req.cookies.token;
    
    if(!jwt.verify(token,"secretKey")){
      return {message:"user is not authenticated!"};
    }
    const {userId} = jwt.verify(token,"secretKey");
    const currentUserPost  = await Post.find({userId}).populate("userId");
    const user = await User.findById(userId);

    

    const followingsPost = await Promise.all(
      user?.followings.map(async(f)=>{
           return await Post.find({userId:f}).populate("userId");
      })
    ); 

    // console.log("from following" , followingsPost);

    

    const combinedPost = currentUserPost.concat(...followingsPost);
    combinedPost.sort((a, b) => b.createdAt - a.createdAt); 
      const  data = combinedPost.map((data)=>{

      const {_id , desc , likes , createdAt , img , userId} = data;
  
      return {
        postId:_id,
        desc,
        likes,
        name:userId?.name,
        img,
        profilePic:userId?.profilePic,
        createdAt,
        userId:userId?._id
      };
  
    })  

   
   

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json("something went wrong!"); 
  }
} 

const getProfilePost = async(req,res)=>{
try {
     const token = req.cookies.token;
     const userId = req.query.userId;

     if(!jwt.verify(token,"secretKey")){
         return {message:"user is not authenticated!"};
     }

     const post = await Post.find({userId}).populate("userId");
     const  data = post.map((data)=>{

      const {_id , desc , likes , createdAt , img , userId} = data;
  
      return {
        postId:_id,
        desc,
        likes,
        name:userId?.name,
        img,
        profilePic:userId?.profilePic,
        createdAt,
        userId:userId?._id
      };
  
    })  


     return res.status(200).json(data);

} catch (error) {
    return res.status(500).json("something went wrong!"); 
}
}


const addPost = async(req,res)=>{
   try {
      const token = req.cookies.token;
      const {userId} = jwt.verify(token,"secretKey");
      if(!userId){
        return {message:"user is not authenticated!"};
      }
      

      await Post.create({
        desc:req.body.desc,
        userId:userId
      });

      return res.status(201).json("post has been posted");
   } catch (error) {
      return res.status(500).json("something went wrong");
   }
}


const deletePost = async(req,res)=>{
   try {
      const token = req.cookies.token;
      const postId = req.params.id;
      const {userId} = jwt.verify(token,"secretKey");
      if(!userId){
        return {message:"user is not authenticated!"};
      }

      await Post.findOneAndDelete({userId:userId,_id:postId});
      
      return res.status(200).json("post has been deleted successfully");

   } catch (error) {
    return res.status(500).json("something went wrong");
   }
}



//like and dislike of post
const likePost = async(req,res)=>{
    try {
      const token = req.cookies.token;
      const {userId} = jwt.verify(token,"secretKey");
      
      if(!userId){
        return {message:"user is not authenticated!"};
      }
      const postId  = req.body.postId;
      await Like.create({
        postId,
        userId
      });
       
      return res.status(200).json({"message":"post has been liked"});
      
    } catch (error) {
      return res.status(500).json("something went wrong");
    }
}


const dislikePost =async(req,res)=>{
  try {
    const token = req.cookies.token;

    if(!jwt.verify(token,"secretKey")){
      return {message:"user is not authenticated!"};
    }
    const {userId} = jwt.verify(token,"secretKey");
    const postId  = req.params.postId;

    // console.log(userId , postId);
   const response = await Like.findOneAndDelete({postId:postId,userId:userId}); 
   if(!response){
       res.status(404).json("something went wrong");
    }
  return res.status(200).json("post has been disliked"); 
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
}


const getLikes = async(req,res)=>{
  try {
    const postId = req.query.postId;
    const data  = await Like.find({postId}).select(['-postId','-__v','-_id']);
    const arr = data.map(d=>d.userId);
    return res.status(200).json(arr);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }

}







module.exports={
  getProfilePost,
  getTimelinePost,
  deletePost,
  addPost,
  likePost,
  dislikePost,
  getLikes
}



