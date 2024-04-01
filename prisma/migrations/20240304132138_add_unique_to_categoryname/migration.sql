/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `JobCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `JobCategory_name_key` ON `JobCategory`(`name`);
