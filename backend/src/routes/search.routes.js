import { Router } from "express";
import { searchAll } from "../controllers/search.controller.js";

const router = Router();

router.get("/projects", searchAll);

export default router;