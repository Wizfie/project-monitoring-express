/*
  Warnings:

  - You are about to drop the column `description` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `week` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `week` DROP FOREIGN KEY `Week_taskId_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `description`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `name`,
    ADD COLUMN `taskName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `week`;

-- CreateTable
CREATE TABLE `Timeline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NULL,
    `timelineMonth` INTEGER NOT NULL,
    `timelineYearStart` INTEGER NOT NULL,
    `timelineYearEnd` INTEGER NOT NULL,
    `realisasiStart` DATETIME(3) NULL,
    `realisasiEnd` DATETIME(3) NULL,
    `value` INTEGER NULL,
    `description` VARCHAR(191) NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Timeline` ADD CONSTRAINT `Timeline_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
