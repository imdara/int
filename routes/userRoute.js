import { Router } from "express";
import {
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js"; // Authentication middleware
import checkRole from "../middleware/rbacMiddleware.js"; // RBAC middleware

const router = Router();

// Define roles for RBAC
const roles = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  USER: 'User',
};

// Routes
router.route("/")
  .get(authenticate, checkRole(roles.ADMIN), getAllUsersController); // Only Admin can get all users

router.route("/me")
  .get(authenticate, getUserController)      // Any authenticated user can view their own profile
  .put(authenticate, updateUserController);   // Authenticated user can update their own profile

router.route("/:id")
  .delete(authenticate, checkRole(roles.ADMIN), deleteUserController); // Only Admin can delete a user

export default router;
