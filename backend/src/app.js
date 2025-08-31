import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import profileRouter from "./routes/profile.routes.js"
import projectRouter from "./routes/project.routes.js"
import skillRouter from "./routes/skill.routes.js"
import searchRouter from "./routes/search.routes.js"
import healthRouter from "./routes/health.routes.js"

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

// API routes
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/skills", skillRouter)
app.use("/api/v1/search", searchRouter)
app.use("/api/v1/health", healthRouter)

export { app }