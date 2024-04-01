/*
  Warnings:

  - You are about to drop the `JobCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `JobCategory` DROP FOREIGN KEY `JobCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `JobCategory` DROP FOREIGN KEY `JobCategory_jobId_fkey`;

-- AlterTable
ALTER TABLE `Job` ADD COLUMN `customId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `JobCategory`;

-- CreateIndex
CREATE UNIQUE INDEX `Job_customId_key` ON `Job`(`customId`);
