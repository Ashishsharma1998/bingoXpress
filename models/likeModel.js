const {Schema,model, default: mongoose} = require("mongoose");



const likeSchema = new Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post",
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
});

const Like = model("Like",likeSchema);
module.exports=Like;
