import { Router } from "express";
import { createRelease } from "../controllers/release.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, createRelease)

export default router