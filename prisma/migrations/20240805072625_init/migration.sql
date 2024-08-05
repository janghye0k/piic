/*
  Warnings:

  - You are about to drop the column `code` on the `sizes` table. All the data in the column will be lost.
  - Added the required column `size` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sizes" DROP COLUMN "code",
ADD COLUMN     "size" TEXT NOT NULL;
