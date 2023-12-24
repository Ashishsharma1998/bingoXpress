const {model,Schema, default: mongoose} = require("mongoose");


const commentSchema = new Schema({
  desc:{
    type:String
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:true,
  },
  
},{timestamps:true});

const Comment = model("Comment",commentSchema);

module.exports = Comment;