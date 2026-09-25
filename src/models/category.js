import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        trim:true,
        required:true,
    },
})

const category = mongoose.model("category",categorySchema);

export default category;