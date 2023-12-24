const express = require("express");
const connectDb = require("./config/dbConfig");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");
const bodyParser = require("body-parser");
const multer  = require("multer");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


// const storage = multer.diskStorage({
//    destination:(req,file,cb)=>{
//       cb(null,"/public")
//    },
//    filename:(req,res,cb)=>{

//    }
// });

// const upload = multer


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
   res.header("Access-Control-Allow-Credentials",true);
   next();
})
app.use(cors({
   origin:"http://localhost:3000"
}));

app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);
app.use("/api/user",userRoute);
app.use("/api/comments",commentRoute);



app.listen(4000,async()=>{
console.log("server started at port at 4000");
await connectDb();
console.log("db connected");
})