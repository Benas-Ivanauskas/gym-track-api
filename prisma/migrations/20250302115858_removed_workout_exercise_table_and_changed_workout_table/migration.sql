/*
  Warnings:

  - You are about to drop the `WorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reps` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "WorkoutExercise";
