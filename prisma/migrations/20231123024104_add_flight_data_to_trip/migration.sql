/*
  Warnings:

  - You are about to drop the column `iataCode` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "iataCode",
ADD COLUMN     "flight_data" TEXT,
ADD COLUMN     "iata_code" TEXT;
