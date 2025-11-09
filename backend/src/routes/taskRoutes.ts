import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  createTaskValidation,
  updateTaskValidation,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = Router();

// Rate limiter: 300 requests per 15 minutes per IP
router.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    message: "Too many requests, please try again later.",
    standardHeaders: true, // Return rate limit info in the headers
    legacyHeaders: false, // Disable the X-RateLimit headers
  })
);

// All routes require authentication
router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(validate(createTaskValidation), createTask);

router
  .route("/:id")
  .get(getTask)
  .put(validate(updateTaskValidation), updateTask)
  .delete(deleteTask);

export default router;
