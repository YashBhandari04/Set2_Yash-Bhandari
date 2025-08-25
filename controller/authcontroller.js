import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js"

export const register = async (req, res) => {
    const{name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({message: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await user.create({name, email, password: hashedPassword});

        res.status(201).json({message: "user registered"})

    } catch (error) {
        res.status(500).json({message: "server error"});
    }
};

export const login = async(req, res)=>{
    const {email, password } = req.body;

    try {
        const user = await user.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});


    } catch (error) {
        res.status(500).json({message: "server error"});
    }
};