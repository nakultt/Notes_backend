import express from "express"
import Feedback from "../models/feedback"
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    email: string;
}

const router = express.Router()

router.post("/feedback/like", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({error: "Unauthorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const userId = decoded.userId

    const existing = await Feedback.findOne({userId})
    if (existing){
        return res.status(400).json({ error: 'Already voted' })
    }

    const feedback = new Feedback(
        {
            userId,
            likes: 1
        }
    )
    feedback.save()
    res.json({
        likes: feedback.likes,
        dislikes: feedback.dislikes
    })

})

router.post("/feedback/dislike", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({error: "Unauthorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const userId = decoded.userId

    const existing = await Feedback.findOne({userId})
    if (existing){
        return res.status(400).json({ error: 'Already voted' })
    }

    const feedback = new Feedback(
        {
            userId,
            dislikes: 1
        }
    )
    feedback.save()
    res.json({
        likes: feedback.likes,
        dislikes: feedback.dislikes
    })

})

router.get("/feedback", async (require, res) => {
    const totalLikes = await Feedback.countDocuments({likes: 1})
    const totalDislikes = await Feedback.countDocuments({dislikes: 1})
    res.json({likes: totalLikes, dislikes: totalDislikes})
})