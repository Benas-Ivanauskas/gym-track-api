/*
  Warnings:

  - You are about to drop the column `reps` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Workout` table. All the data in the column will be lost.
  - Changed the type of `sets` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "reps",
DROP COLUMN "weight",
DROP COLUMN "sets",
ADD COLUMN     "sets" JSONB NOT NULL;
