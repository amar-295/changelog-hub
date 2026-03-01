import { Router } from 'express';
import { getPublicReleases, subscribeToChangelog, unsubscribeFromChangelog } from '../controllers/public.controller.js';

const router = Router();

router.route("/:subdomain/releases").get(getPublicReleases)
router.route("/:subdomain/subscribe").post(subscribeToChangelog)
router.route("/unsubscribe/:token").get(unsubscribeFromChangelog)

export default router