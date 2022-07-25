/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `teachersDisciplines` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherDisciplineId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `disciplinesId` to the `teachersDisciplines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriesId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplinesId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherDisciplinesId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- AlterTable
ALTER TABLE "teachersDisciplines" DROP COLUMN "disciplineId",
ADD COLUMN     "disciplinesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "categoryId",
DROP COLUMN "disciplineId",
DROP COLUMN "teacherDisciplineId",
ADD COLUMN     "categoriesId" INTEGER NOT NULL,
ADD COLUMN     "disciplinesId" INTEGER NOT NULL,
ADD COLUMN     "teacherDisciplinesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplinesId_fkey" FOREIGN KEY ("disciplinesId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplinesId_fkey" FOREIGN KEY ("teacherDisciplinesId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplinesId_fkey" FOREIGN KEY ("disciplinesId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
