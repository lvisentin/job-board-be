/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `_JobToJobCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JobToJobCategory_AB_unique`(`A`, `B`),
    INDEX `_JobToJobCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_JobToJobCategory` ADD CONSTRAINT `_JobToJobCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToJobCategory` ADD CONSTRAINT `_JobToJobCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `JobCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
