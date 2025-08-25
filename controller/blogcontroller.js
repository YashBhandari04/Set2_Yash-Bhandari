import Blog from "../model/userBlog.js"
import cloudinary from "../config/cloudinary.js";


export const createBlog = async(req, res) =>{
    try {
        const {title, content, image} = req.body;
        if(!title || !content || !image){
            return res.status(400).json({message: "Missing fields"});
        }

        let uploadedImage = null;
        if (image){
            uploadedImage = await cloudinary.v2.uploader.upload(image,{folder: "blogs"});
        }

        const blog = await Blog.create({
            title,
            content,
            imageURL: uploadedImage.secure_url,
            authorId: req.user.id
        })

        res.status(201).json(blog);

    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}

export const getBlog = async(req, res) =>{
    try {
        const blog = await Blog.findById(req.params.id).populate("authorId", "name, email");

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);

    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}