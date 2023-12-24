const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const regsiter  =  async(req,res)=>{
    try {
       const {password} = req.body;
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt);
      
       await User.create({
        ...req.body,
        password:hash
       });
       return res.status(201).json({
         message:"User has been registered successfully"
       })
    } catch (error) {
       return {
         message:"something went wrong!",
         error 
       }
    }
}

const login = async(req,res)=>{
    try {
       const user = await User.findOne({username:req.body.username});
       
       if(!user){
          return {
             message:"password or username is incorrect"
          }
       }
 
       if(!bcrypt.compareSync(req.body.password , user.password)){
          return {
             message:"password or username is incorrect"
          }
       }
 
       const token = jwt.sign({userId:user._id},"secretKey");
      
      res.cookie("token",token,{httpOnly:true});
       const {password , ...others} = user._doc;
      return res.status(200).json(others);
 
    } catch (error) {
       return {
          message:"something went wrong"
       }
    }
 }



 const logout = async(req,res)=>{
    try {
       res.clearCookie("token",{
          secure:true,
          sameSite:true,
       }).status(200).json("user has been logged out");
    } catch (error) {
       console.log(error);
    }
 }


 module.exports = {
    regsiter,
    login,
    logout
 }  