import { Router } from "express";
import { createRelease, getAllReleases } from "../controllers/release.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, createRelease).get(verifyJWT, getAllReleases)

export default router