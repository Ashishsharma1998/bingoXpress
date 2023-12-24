const mongoose = require("mongoose");

const connectDb = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/bingoDb");
    } catch (error) {
        console.log("db not connected!");
    }
}
module.exports = connectDb;