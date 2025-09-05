import express from "express"
import bcrypt from "bcrypt"
import User from "./models/users"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }
    }
})