/*
  Warnings:

  - You are about to drop the column `created_by` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `created_by`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
