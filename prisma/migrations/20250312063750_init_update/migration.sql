/*
  Warnings:

  - Made the column `taskId` on table `timeline` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `timeline` DROP FOREIGN KEY `Timeline_taskId_fkey`;

-- DropIndex
DROP INDEX `Timeline_taskId_fkey` ON `timeline`;

-- AlterTable
ALTER TABLE `timeline` MODIFY `taskId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Timeline` ADD CONSTRAINT `Timeline_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
