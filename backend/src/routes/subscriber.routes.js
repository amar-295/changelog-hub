import { Router } from "express";
import { getAllSubscribers, deleteSubscriber } from "../controllers/subscriber.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllSubscribers);
router.route("/:id").delete(deleteSubscriber);

export default router;