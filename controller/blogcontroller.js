import Blog from "../model/userBlog.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({ message: "Missing fields" });
    }

   
    const uploaded = await cloudinary.uploader.upload(image, { folder: "blogs" });
    if (!uploaded || !uploaded.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const blog = await Blog.create({
      title,
      content,
      imageURL: uploaded.secure_url,
      authorId: req.user && (req.user._id || req.user.id) 
    });

    return res.status(201).json(blog);
  } catch (error) {
    console.error("createBlog error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("authorId", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("getBlog error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
