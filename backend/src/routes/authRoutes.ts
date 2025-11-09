import { Router } from 'express';
import { register, login, getMe, registerValidation, loginValidation } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';
import rateLimit from 'express-rate-limit';

const router = Router();

// Apply rate limiting to the /me endpoint
const meLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', meLimiter, protect, getMe);

export default router;
