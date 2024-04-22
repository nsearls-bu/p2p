/*
  Warnings:

  - You are about to drop the column `userId` on the `ActiveUser` table. All the data in the column will be lost.
  - Added the required column `userID` to the `ActiveUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActiveUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    CONSTRAINT "ActiveUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ActiveUser" ("id", "username") SELECT "id", "username" FROM "ActiveUser";
DROP TABLE "ActiveUser";
ALTER TABLE "new_ActiveUser" RENAME TO "ActiveUser";
CREATE UNIQUE INDEX "ActiveUser_userID_key" ON "ActiveUser"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
