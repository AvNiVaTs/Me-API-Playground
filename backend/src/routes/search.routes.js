import { Router } from "express"
import { searchProfileData } from "../controllers/search.controller.js"

const router = Router()

router.get("/", searchProfileData)

export default router