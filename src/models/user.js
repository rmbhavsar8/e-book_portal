import mongoose from "mongoose";
import constants from "../utils/constant.js";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:6,
    },
    role:{
        type:Number,
        enum:Object.values(constants.UserType),
        default:constants.UserType.Reader
    }
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))
    {
        return next();
    }
    try {
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(this.password,saltRounds);
        this.password = hashedPassword;
    } catch (error) {
        console.error(error);
    }


})

const User = mongoose.model("User",userSchema);

export default User;

