import { text } from "express";
import mongoos from "mongoose";

const userSchema= new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
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
    
    profilePicture:{
        type:String,
        default:""
    },
    bannerImg:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:"linkedin User"
    },
    location:{
        type:String,
        default:"Earth"
    },
    about:{
        type:String,
        default:""
    },
    skills:[String],
    experience:[
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],

    education:[
        {
            school: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number,

        },
    ],
    connections:[
        {
            type:mongoos.Schema.Types.ObjectId, ref:"User"
        }
    ]


},{timestamps:true}
);

const User=mongoos.model("User", userSchema);
export default User;