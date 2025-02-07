import { Router } from "express";
import {
  createUser,
  forgotPassword,
  getResetLink,
  loginUser,
  resetPassword,
} from "../controllers/usersController.js";
import { validateUserInput } from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", validateUserInput, createUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.get("/reset-password", getResetLink);
router.post("/reset-password", resetPassword);

export default router;
