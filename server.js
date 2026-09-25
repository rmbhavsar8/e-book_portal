import express from "express";
import app from "./src/app.js";
import "dotenv/config"
import connectDB from "./src/config/db.js"

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("database connection failed");
        process.exit(1);
    }
}

startServer();
