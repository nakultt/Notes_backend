import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    vote: { 
        type: String, 
        enum: ['like', 'dislike', null], 
        default: null 
    }
})

const Feedback = mongoose.model("Feedback", feedbackSchema)

export default Feedback