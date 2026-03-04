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
  updateAccountDetails,
  changeCurrentPassword,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/validate-session').get(validateSession);
router.route('/me').get(verifyJWT, getCurrentUser);
router.route('/update-account').patch(verifyJWT, updateAccountDetails);
router.route('/change-password').post(verifyJWT, changeCurrentPassword);

// Github routes
router.route('/github').get(githubLogin);
router.route('/github/callback').get(githubLoginCallback);

export default router;
