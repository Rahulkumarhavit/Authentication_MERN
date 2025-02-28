import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateVerificationToken } from "../utils/generateVerificationCode.js";

export const signup = async (req,res)=>{
    const {email,password,name} = req.body;
    try {
        if(!email||!password||!name){
            res.status(403).json({success:false,message:['All fields are required']});
        }

        const userAlreadyExists = await User.findOne(
            {email:email}
        )
        if(userAlreadyExists){
            return res.status(400).json({success:false,message:["User already exists."]});
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = generateVerificationToken();

        const user = user({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })
        await user.save();
        // jwt
        generateTokenAndSetCookie(res,user._id);

        res.status(201).json({
            success:true,
            message:"User created successfully.",
            user:{
                ...user._doc,
                password:null
            }
        });
    } catch (error) {   
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req,res)=>{
    res.send("login")
}


export const logout = async (req,res) =>{
    res.send("/logout")
}