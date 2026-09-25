import User from "../models/user.js";

const findUserByEmail = async (email) => {
    const user= await User.findOne({email}).select("-password");
    return user;
}

const createUser = async(userData)=>{
    const user = await User.create(userData);
    return user;
}

const findUserByEmailwithPassword = async (email) => {
    const user= await User.findOne({email}).select("+password");
    return user;
}



const userService = {
    findUserByEmail,
    createUser,
    findUserByEmailwithPassword
}

export default userService;