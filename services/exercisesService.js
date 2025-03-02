import prisma from "../prisma/prismaClient.js";

export const getListCategories = () => {
  return prisma.category.findMany();
};

export const getListExercises = (categoryId) => {
  return prisma.exercise.findMany({
    where: {
      categoryId: Number(categoryId),
    },
  });
};

export const getExercise = (categoryId, exerciseId) => {
  return prisma.exercise.findFirst({
    where: { categoryId: Number(categoryId), id: Number(exerciseId) },
    include: {
      category: true,
    },
  });
};

export const createNewWorkout = (categoryName, exerciseName, userId, sets) => {
  return prisma.workout.create({
    data: {
      categoryName: categoryName,
      exerciseName: exerciseName,
      userId: userId,
      sets: sets,
    },
  });
};
