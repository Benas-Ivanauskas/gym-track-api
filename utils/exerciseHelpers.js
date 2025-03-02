import logger from "../config/logger.js";
import ErrorHandler from "../errors/error.js";

export const isExerciseExists = (exercise, exerciseId, categoryId) => {
  if (!exercise) {
    logger.error(`Excersise is not found by ${exerciseId}-id`, 404);
    throw new ErrorHandler(
      `Exercise not found for exerciseId ${exerciseId} in category ${categoryId}`,
      404
    );
  }
};
