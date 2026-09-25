import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI

const connectDB = async (MONGO_URL) =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("database is connected successfully.");
        
    } catch (error) {
        console.error(error);
        console.log("database connection failed");
    }
}

export default connectDB;