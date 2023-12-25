const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


//follow and unfollow a user
const followUser = async(req,res)=>{
    try {
       const followedUserId = req.params.id;
       const token = req.cookies.token;
       const {userId} = jwt.verify(token,"secretKey");
       if(!userId){
         return {message:"user is not authenticated!"};
       }
  
       const currentUser = await User.findById(userId);
       const user =await User.findById(followedUserId);
       if(!user.followers.includes(currentUser._id)){
        await user.updateOne({$push:{followers:userId}});
        await currentUser.updateOne({$push:{followings:followedUserId}});
         return res.status(201).json("user has been followed");
       }
       return {message:"user has already been followed"}
  
  
    } catch (error) {
      return res.status(500).json("something went wrong");
    }
  }
  
  
  const unfollowUser = async(req,res)=>{
    try {
       const followedUserId = req.params.id;
       const token = req.cookies.token;
       const {userId} = jwt.verify(token,"secretKey");
       if(!userId){
         return {message:"user is not authenticated!"};
       }
  
       const currentUser = await User.findById(userId);
       const user =await User.findById(followedUserId);
       if(user.followers.includes(currentUser._id)){
        await user.updateOne({$pull:{followers:userId}});
        await currentUser.updateOne({$pull:{followings:followedUserId}});
         return res.status(201).json("user has been unfollowed");
       }
       return {message:"user has already been unfollowed"}
    } catch (error) {
      return res.status(500).json("something went wrong");
    }
  }
  
  const getAllFollowings = async(req,res)=>{
    try {
       const token  = req.cookies.token;
       if(!jwt.verify(token,"secretKey")){
         return {message:"user is not authenticated!"};
       }
       
       const {userId} = jwt.verify(token,"secretKey");
       const user = await User.findById(userId);
       const {followings} = user._doc;
       return res.status(200).json(followings);
  
    } catch (error) {
      return res.status(500).json("something went wrong");
    }
  }


  const getUser = async(req,res)=>{
    try {
      const userId = req.params.userId;
      const response  = await User.findById(userId);
      const {password,...remaining} = response._doc;
      return res.status(200).json(remaining);
    } catch (error) {
      return res.status(500).json("something went wrong");
    }
  }



  const updateUser = async(req,res)=>{
  try {
     const token = req.cookies.token;
     const {name,username,email,website,city} = req.body;
     if(!jwt.verify(token,"secretKey")){
      return {message:"user is not authenticated!"};        
      }
      
      const {userId} = jwt.verify(token,"secretKey");
      console.log(userId,req.body);
      const response = await User.findByIdAndUpdate({_id:userId},{$set:{
        name:name,
        website:website,
        city:city,
        username:username,
        email:email
      }},{new:true});
      if(!response){
          return {message:"user not found"};
      }
      return res.status(201).json(response);

  } catch (error) {
    return res.status(500).json(error);
  }
  }

  module.exports = {
    followUser,
    unfollowUser,
    getAllFollowings,
    getUser,
    updateUser
  }