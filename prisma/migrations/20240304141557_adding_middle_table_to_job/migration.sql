/*
  Warnings:

  - The primary key for the `JobCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `JobCategory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `JobCategory` table. All the data in the column will be lost.
  - You are about to drop the `_JobToJobCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `JobCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `JobCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_JobToJobCategory` DROP FOREIGN KEY `_JobToJobCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_JobToJobCategory` DROP FOREIGN KEY `_JobToJobCategory_B_fkey`;

-- DropIndex
DROP INDEX `JobCategory_name_key` ON `JobCategory`;

-- AlterTable
ALTER TABLE `JobCategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `jobId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`categoryId`, `jobId`);

-- DropTable
DROP TABLE `_JobToJobCategory`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobCategory` ADD CONSTRAINT `JobCategory_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobCategory` ADD CONSTRAINT `JobCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
