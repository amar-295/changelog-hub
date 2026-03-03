import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  githubLogin,
  githubLoginCallback,
  validateSession,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/validate-session').get(validateSession);
router.route('/me').get(verifyJWT, getCurrentUser);

// Github routes
router.route('/github').get(githubLogin);
router.route('/github/callback').get(githubLoginCallback);

export default router;
