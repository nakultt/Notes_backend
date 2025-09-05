import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import feedbackRouter from "./routes/feedbackroutes"
import connectDB from "./config/database"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT!

app.use("/auth", authRouter)
app.use("/api", feedbackRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serever is running on port ${PORT}`)
    })
})
