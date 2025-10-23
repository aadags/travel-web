/*
  Warnings:

  - Added the required column `city` to the `tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "widget" TEXT;
