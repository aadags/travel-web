/*
  Warnings:

  - You are about to drop the column `lowest_price` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the `destination_gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `destinations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "destination_gallery" DROP CONSTRAINT "destination_gallery_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_tour_id_fkey";

-- AlterTable
ALTER TABLE "tours" DROP COLUMN "lowest_price";

-- DropTable
DROP TABLE "destination_gallery";

-- DropTable
DROP TABLE "destinations";
