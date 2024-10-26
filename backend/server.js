import express from "express";
import cors from  "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes  from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js"

import path from "path";


import { connectDB } from "./lib/db.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000 ;

const __dirname=path.resolve();

if (process.env.NODE_ENV==="production"){
    app.use(cors({
        origin:"http://localhost:5173",
        credentials: true,
        
    })
);
}




app.options('*', cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// if limit is not defined then "payload is too large  to handle!!!!!"
app.use(express.json({limit:"5mb"}));//this is used to parsethe content from the json body.
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);  
                                                       
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();//connecting the database present in lib folder and db.js file
})