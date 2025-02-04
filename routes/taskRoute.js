import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
  getAllTasksController,
} from "../controllers/taskController.js";
import authenticate from "../middleware/authMiddleware.js"; // Import authentication middleware
import checkRole from "../middleware/rbacMiddleware.js"; // Import RBAC middleware

const router = Router();

// Define roles for RBAC
const roles = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  USER: 'User',
};

// Routes
router.route("/")
  .get(authenticate, getAllTasksController) // Only authenticated users can get tasks
  .post(authenticate, checkRole(roles.ADMIN), checkRole(roles.MANAGER), createTaskController) // Admin and Manager can create tasks
  .put(authenticate, checkRole(roles.ADMIN), editTaskController) // Admin can edit tasks
  .delete(authenticate, checkRole(roles.ADMIN), deleteTaskController); // Admin can delete tasks

export default router;
