import logger from "../config/logger.js";
import ErrorHandler from "../errors/error.js";
import prisma from "../prisma/prismaClient.js";
import {
  createNewWorkout,
  getListCategories,
  getListExercises,
  getExercise,
} from "../services/exercisesService.js";
import { isExerciseExists } from "../utils/exerciseHelpers.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getListCategories();

    res.status(200).json({
      data: categories,
    });
    logger.info(`Successfully fetched ${categories.length} categories`);
  } catch (err) {
    next(err);
  }
};

export const getExercises = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const exercises = await getListExercises(categoryId);

    res.status(200).json({
      data: exercises,
    });
    logger.info(
      `Successfully fetched ${exercises.length} exercises for category id- ${categoryId}`
    );
  } catch (err) {
    next(err);
  }
};

export const getCurrentExercise = async (req, res, next) => {
  try {
    const { categoryId, id } = req.params;
    console.log(categoryId, id);

    const exercise = await getExercise(categoryId, id);
    isExerciseExists(exercise, id, categoryId);

    res.status(200).json({
      data: exercise,
    });
    logger.info(
      `Successfully fetched exercise ${id} in category ${categoryId}.`
    );
  } catch (err) {
    next(err);
  }
};

export const createWorkout = async (req, res, next) => {
  try {
    const { sets } = req.body;
    const { categoryId, exerciseId } = req.params;

    const exercise = await getExercise(categoryId, exerciseId);
    isExerciseExists(exercise, exerciseId, categoryId);

    const newWorkout = await createNewWorkout(
      exercise?.category?.name,
      exercise?.name,
      req?.user?.id,
      sets
    );

    logger.success(
      `User (userId-${
        req.user?.id
      }), Successfully created new workout ${JSON.stringify(newWorkout)}`
    );

    res.status(201).json({
      data: {
        newWorkout,
      },
    });
  } catch (err) {
    next(err);
  }
};
