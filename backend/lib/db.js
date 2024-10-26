import mongoose from "mongoose";

export const connectDB= async ()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoose connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`mongoose connection failed ${error.message}`)
        process.exit(1)

    }

}