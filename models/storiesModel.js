const {model,Schema, default: mongoose} = require("mongoose");


const storiesSchema = new Schema({
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  img:{
    type:String,
  },
},{timestamps:true});

const Stories = model("Stories",storiesSchema);

module.exports = Stories;