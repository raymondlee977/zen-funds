import { Router } from "express";
import { loginUser, signupUser, getUserData } from '../controllers/userController.js';

const router = Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// Get user route
router.get("/:email", getUserData)

export default router;