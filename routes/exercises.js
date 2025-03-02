import { Router } from "express";
import {
  createWorkout,
  getCategories,
  getCurrentExercise,
  getExercises,
} from "../controllers/excersisesController.js";

const router = Router();

router.get("/categories", getCategories);

router.get("/categories/:categoryId/exercises", getExercises);

router.get("/categories/:categoryId/exercises/:id", getCurrentExercise);

router.post(
  "/categories/:categoryId/exercises/:exerciseId/createWorkout",
  createWorkout
);

export default router;
