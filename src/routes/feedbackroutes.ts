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

    await Feedback.findOneAndUpdate(
      { userId },
      { vote: 'like' },
      { upsert: true, new: true }
    )
    const totalLikes = await Feedback.countDocuments({ vote: 'like' });
    const totalDislikes = await Feedback.countDocuments({ vote: 'dislike' });
    res.json({
      likes: totalLikes,
      dislikes: totalDislikes,
      userVote: 'like'
    })

})

router.post("/feedback/dislike", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({error: "Unauthorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const userId = decoded.userId

    await Feedback.findOneAndUpdate(
      { userId },
      { vote: 'dislike' },
      { upsert: true, new: true }
    )
    const totalLikes = await Feedback.countDocuments({ vote: 'like' });
    const totalDislikes = await Feedback.countDocuments({ vote: 'dislike' });
    res.json({
      likes: totalLikes,
      dislikes: totalDislikes,
      userVote: 'dislike'
    })
})

router.get("/feedback", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({error: "Unauthorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const userId = decoded.userId
    const userFeedback = await Feedback.findOne({ userId });

    const totalLikes = await Feedback.countDocuments({vote: 'like'})
    const totalDislikes = await Feedback.countDocuments({vote: 'dislike'})
    res.json({
        likes: totalLikes, 
        dislikes: totalDislikes,
        userVote: userFeedback ? userFeedback.vote : null
    })
})

export default router