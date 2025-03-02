/*
  Warnings:

  - You are about to drop the column `name` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseName` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "exerciseName" TEXT NOT NULL;
