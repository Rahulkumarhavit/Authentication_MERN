import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import "dotenv/config"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use("/api/auth",authRoutes)

app.listen(3000, ()=>{
    connectDB();
    console.log("server is running",3000);
})