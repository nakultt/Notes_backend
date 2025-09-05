import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        default: 0 
    }
})

const Feedback = mongoose.model("User", feedbackSchema)

export default Feedback