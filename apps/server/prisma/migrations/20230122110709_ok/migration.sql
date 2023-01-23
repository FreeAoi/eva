/*
  Warnings:

  - You are about to drop the column `role` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "role",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Role";
