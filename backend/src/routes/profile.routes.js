import { Router } from "express";
import { createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/profile.controller.js";

const router = Router();

router.post("/", createProfile);
router.get("/", getProfile);
router.put("/", updateProfile);
router.delete("/", deleteProfile);

export default router;