import { Router } from "express"
import { createProfile, getProfile, updateProfile } from "../controllers/profile.controller.js"

const router = Router()

router.post("/", createProfile)
router.get("/", getProfile)
router.put("/", updateProfile)

export default router