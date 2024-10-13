import express from 'express';
import isAuthenticate from '../middlewares/isAuthenticate.js';
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/post').post(isAuthenticate, postJob);
router.route('/get').get(isAuthenticate, getAllJobs);
router.route('/getadminjobs').get(isAuthenticate, getAdminJobs);
router.route('/get/:id').get(isAuthenticate, getJobById);

export default router;
