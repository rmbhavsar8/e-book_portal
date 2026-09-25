import express from "express";
import ApiError from "../utils/apiError";

const errorMiddleware =  (err,req,res,next) => {
    console.log(err);

    //duplicate email error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
        return res.status(400).json({
            success:false,
            message:message
        })
    }

    //validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({
            success:false,
            message:message,
        })
    }

    //custom error 
    if(err instanceof ApiError){
        return res.status(this.statusCode).json({
            success:false,
            message:this.message
        })
    }
}       

export default errorMiddleware;