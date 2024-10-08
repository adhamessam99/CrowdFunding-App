/*
  Warnings:

  - You are about to drop the column `campaigntitle` on the `Campaigns` table. All the data in the column will be lost.
  - Added the required column `campaignTitle` to the `Campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaigns" DROP COLUMN "campaigntitle",
ADD COLUMN     "campaignTitle" TEXT NOT NULL,
ALTER COLUMN "amountRaised" SET DEFAULT 0.0;
