import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8000

app.get("/", (req,res) => {
    res.send({message: "API is running...."})
})


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);


app.listen(PORT, ()=>{
    console.log("server started: ", PORT)
})