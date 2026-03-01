import { Router } from "express";
import { createRelease, getAllReleases, getReleaseById, updateRelease, deleteRelease, publishRelease, unpublishRelease } from "../controllers/release.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, createRelease).get(verifyJWT, getAllReleases)

router.route("/:id").get(verifyJWT, getReleaseById).patch(verifyJWT, updateRelease).delete(verifyJWT, deleteRelease)

router.route("/:id/publish").patch(verifyJWT, publishRelease)

router.route("/:id/unpublish").patch(verifyJWT, unpublishRelease)

export default router