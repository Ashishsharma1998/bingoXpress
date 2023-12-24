const {Schema,model, default: mongoose} = require("mongoose");

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  profilePic:{
    type:String,
    default:""
  },
  coverPic:{
    type:String,
    default:""
  },
  city:{
    type:String,
    default:"IND"
    
  },
  website:{
    type:String,
    default:"something.com"
  },
  followers:{
    type:Array,
    default:[]
  },
  followings:{
    type:Array,
    default:[]
    }
  
},{
    timestamps:true
});


const User = model("User",userSchema);
module.exports = User;