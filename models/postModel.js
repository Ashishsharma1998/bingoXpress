const {model,Schema, default: mongoose} = require("mongoose");


const postSchema = new Schema({
  desc:{
    type:String
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  img:{
    type:String,
    default:""
  }
},{timestamps:true});

const Post = model("Post",postSchema);

module.exports = Post;