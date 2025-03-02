/*
  Warnings:

  - Added the required column `sets` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "sets" INTEGER NOT NULL;
