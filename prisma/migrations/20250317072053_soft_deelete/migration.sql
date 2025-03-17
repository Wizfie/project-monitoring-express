-- AlterTable
ALTER TABLE `project` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `timeline` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
