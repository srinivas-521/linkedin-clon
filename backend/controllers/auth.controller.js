import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendwelcomeEmail} from "../emails/emailHandlers.js"


export const signup= async (req,res)=>{
    try{
        
        const {name, username , email , password}=req.body;

        // if(!name ||username || email || password ){
        //     res.status(400).json({message:"All fields are required"})
        // }
        const existingEmail= await User.findOne({ email }) //checking in the database if there alredy exist any emails
        if (existingEmail){
            return res.status(400).json({message:"Email already exists"})
        }

        const existingUsername= await User.findOne({ username }) //checking in the database if there alredy exist any emails
        if (existingUsername){
            return res.status(400).json({message:"Username already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Your password should have atleast 6 characters"})
        }

        const salt= await bcrypt.genSalt(10);//to encrypt the password
        const hashedPassword=await bcrypt.hash(password,salt);

        const user= new User({
            name,
            email,
            password:hashedPassword,
            username
        });

        await user.save();

        const token=jwt.sign( {userId:user._id}, process.env.JWT_SECRET , {expiresIn:"3d"})

        res.cookie("jwt-linkedin", token,{
            httponly:true,//prevents XSS attacks
            maxAge: 3*24*60*60*1000,
            sameSite:"strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" ,//prevent man-in-middle attack

        });

        res.status(201).json({message:"YOu have signed up successfully"});

        const profileUrl=process.env.CLIENT_URL+"/profile/"+user.username;

        try{

            await sendwelcomeEmail(user.email,user.name,profileUrl);

        }catch(Emailerror){

            console.error("Error in sending email", Emailerror);


        }


    }
    catch(error){
        console.log("Error in signing Up",error.message);
        res.status(500).json( { message:"Internal Server error"});

    }
}

export const logout=(req,res)=>{
    res.clearCookie("jwt-linkedin");
    res.json({message:"You have logged Out successfully"});
}

export const login= async (req,res)=>{
    try{

        const { username, password}=req.body;


        //check if username exist
        const user= await User.findOne({ username });
        if(!user){
            return res.status(400).json({message:"Invalid username"})
        }

        //check if password is correct

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        //create and send token

        const token=jwt.sign( {userId:user._id}, process.env.JWT_SECRET , {expiresIn:"3d"})

        res.cookie("jwt-linkedin", token,{
            httpOnly:true,//prevents XSS attacks
            maxAge: 3*24*60*60*1000,
            sameSite:"strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        return res.json({message:"Loggedin Successfully"});

        



    }
    catch(error){


        console.error("Error  in login Controller",error)
        return res.status(500).json({message:"Invernal server Issue"})

    }
    
};

export const getcurrentUser= async(req,res)=>{

    try{
        res.json(req.user);

    }
    catch(err){
        console.error("error in getcurrentUser controller",err)
        res.status(500).json({message:"internal server error"});

    }

}