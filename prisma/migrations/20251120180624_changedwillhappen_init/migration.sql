-- CreateTable
CREATE TABLE "Vyakti" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Vyakti_id_key" ON "Vyakti"("id");
