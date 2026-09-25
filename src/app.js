import express from "express"
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";


const app = express();

app.use(express.json())

app.use("/auth",authRoutes);

app.use("/category",categoryRoutes)

app.use("/",(req,res)=>{
    res.json({message:"api is running"})
})

export default app;