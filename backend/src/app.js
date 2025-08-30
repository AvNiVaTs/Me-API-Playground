import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send({
        activeStatus: "Server is running",
        error: false,
    })
})

import empRouter from "./routes/user.routes.js"

//http://localhost:8000/api/v1/user/....
app.use("/api/v1/user", userRouter)

export { app }