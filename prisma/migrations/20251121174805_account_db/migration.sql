/*
  Warnings:

  - You are about to drop the `Vyakti` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Vyakti";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");
