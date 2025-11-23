import express from 'express';
import {login,signup, getprofile} from '../controllers/userController.js';
import {protect} from '../middlewares/authMiddleware.js';


const router  = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);


router.post('/user/profile', protect, getprofile);

export default router;