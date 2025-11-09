import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  createTaskValidation,
  updateTaskValidation
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

// Rate limiter: 100 requests per 15 minutes per IP
router.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the headers
    legacyHeaders: false,  // Disable the X-RateLimit headers
  })
);

const router = Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validate(createTaskValidation), createTask);

router.route('/:id')
  .get(getTask)
  .put(validate(updateTaskValidation), updateTask)
  .delete(deleteTask);

export default router;
