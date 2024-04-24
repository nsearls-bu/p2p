/*
  Warnings:

  - The primary key for the `Connection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `initiatorActiveID` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `recipientActiveID` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `initiatorUsername` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientUsername` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connection" (
    "id" TEXT NOT NULL,
    "initiatorSDP" TEXT,
    "answerSDP" TEXT,
    "initiatorUsername" TEXT NOT NULL,
    "recipientUsername" TEXT NOT NULL,

    PRIMARY KEY ("initiatorUsername", "recipientUsername")
);
INSERT INTO "new_Connection" ("answerSDP", "id", "initiatorSDP") SELECT "answerSDP", "id", "initiatorSDP" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
