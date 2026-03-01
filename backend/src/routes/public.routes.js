import { Router } from 'express';
import { getPublicReleases } from '../controllers/public.controller.js';

const router = Router();

router.route("/:subdomain/releases").get(getPublicReleases)

export default router