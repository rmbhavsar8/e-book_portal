import mongoose from "mongoose";
import constants from "../utils/constant.js";
import bcrypt from "bcrypt"

const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        trim:true,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    // comments:{
    //     type:[],
    // },
    bookStatus:{
        type:Number,
        enum:Object.values(constants.BookStatus),
        default:constants.UserType.Draft
    },
    // catagoty:{
    //     
    // },
})

const Book = mongoose.model("Book",bookSchema);

export default Book;

