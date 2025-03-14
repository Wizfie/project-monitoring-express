/*
  Warnings:

  - You are about to alter the column `created_by` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pic` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `created_by` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `pic` INTEGER NOT NULL;
