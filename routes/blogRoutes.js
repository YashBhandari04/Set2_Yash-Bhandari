import express from "express";
import { createBlog, getBlog } from "../controller/blogcontroller.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getBlog);

export default router;