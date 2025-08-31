import { Router } from "express"
import { createProject, getProjects, getProjectById, updateProject } from "../controllers/project.controller.js"

const router = Router()

router.post("/", createProject)
router.get("/", getProjects)
router.get("/:id", getProjectById)
router.put("/:id", updateProject)

export default router