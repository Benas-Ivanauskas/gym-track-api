import { Router } from "express";
import { createUser, loginUser } from "../controllers/usersController.js";
import {
  authenticateUser,
  validateUserInput,
} from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", validateUserInput, createUser);

router.post("/login", loginUser);

export default router;
