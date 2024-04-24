/*
  Warnings:

  - The primary key for the `Connection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `initiatorUsername` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `recipientUsername` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `initiatorActiveID` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientActiveID` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connection" (
    "id" TEXT NOT NULL,
    "initiatorSDP" TEXT,
    "answerSDP" TEXT,
    "initiatorActiveID" TEXT NOT NULL,
    "recipientActiveID" TEXT NOT NULL,

    PRIMARY KEY ("initiatorActiveID", "recipientActiveID")
);
INSERT INTO "new_Connection" ("answerSDP", "id", "initiatorSDP") SELECT "answerSDP", "id", "initiatorSDP" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
