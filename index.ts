import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import x from "./auth"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT!
const MONGO_URI = process.env.MONGO_URI!

app.use("/auth", x)

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:",err))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
