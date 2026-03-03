import { Router } from "express";
import { updateWorkspace, getWorkspaceDetails } from "../controllers/workspace.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getWorkspaceDetails).put(verifyJWT, upload.single("logo"), updateWorkspace)

export default router;