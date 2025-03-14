/*
  Warnings:

  - Added the required column `created_by` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pic` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `created_by` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `pic` VARCHAR(191) NOT NULL;
