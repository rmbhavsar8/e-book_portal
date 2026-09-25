import jwt from "jsonwebtoken";
import userService from "../services/userService.js";
import bcrypt from "bcrypt"

const generateJwtToken =  function(user){
     const token = jwt.sign(
        {
            userId:user._id,
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JET_EXPIRES
        }
    )
    return token;
}

const register = async (req,res,next) =>{

    const {userName,email,password,role} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({
            sucess:false,
            message:"username, email and password are required"
        })
    }
    if(password.length<6){
       return  res.status(400).json({
            success:false,
            message:"password must be at least 6 characters long"
        })
    }
    try {
       const user = await userService.findUserByEmail(email);
       
       if(user!==null){
         return res.status(400).json({
            success:false,
            message:"user alerady exists"
         })
       }

       const newUser= await userService.createUser(req.body)       

       const token = generateJwtToken(newUser);

       res.status(201).json({
        success:true,
        messasge:"user created successfully.",
        token,
        user:{
            userId:newUser._id,
            userName: newUser.userName,
            email:newUser.email,
            role:newUser.role
        }
       })
       
    } catch (error) {
        next(error)
    }
}


const login = async(req,res,next)=>{
    const {email,password} =req.body;

    if(!email || !password){
        return res.status(400).json({
            sucess:false,
            message:"email and password are required"
        })
    }

    try {
        const user = await userService.findUserByEmailwithPassword(email);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        
        const checkPassword = await bcrypt.compare(password,user.password);
        
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const token =  generateJwtToken(user);
        res.status(200).json({
            success:true,
            message:"user logged in successfully.",
            token,
            user
        })

    } catch (error) {
        next(error)
    }
}

const authController={
    register,
    login
}

export default authController;
