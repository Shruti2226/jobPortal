import express from 'express';
import {
  login,
  register,
  updateProfile,
  logout,
} from '../controllers/userController.js';
import isAuthenticate from '../middlewares/isAuthenticate.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router
  .route('/profile/update')
  .put(isAuthenticate, singleUpload, updateProfile);

export default router;
