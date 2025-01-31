import {User}  from "../model/user.js";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        if ([fullName, email, password].some((field) => !field?.trim())) {
            res.status(400).json({ message: "Please fill in all fields" });
            return 
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400).json({ message: "User already exists" });
            return
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });
        await user.save();

        const userCreated = await User.findById(user._id).select("-password -_id -createdAt -updatedAt -__v");

        if (!userCreated) {
         res.status(500).json({ message: "Something went wrong while registering the user" });
         return
        }

        res.status(201).json({  
            message: "User registered successfully",
            user: userCreated 
        });
        return
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error",
           
        });
        return
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if ([email, password].some((field) => !field?.trim())) {
            res.status(400).json({ message: "Please fill in all fields" });
            return
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return
        }

        res.status(200).json({ message: "User logged in successfully" });
        return
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return
    }
}

