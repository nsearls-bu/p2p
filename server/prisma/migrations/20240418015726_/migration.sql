/*
  Warnings:

  - Added the required column `messageContents` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderID" TEXT NOT NULL,
    "recipientID" TEXT NOT NULL,
    "timeSent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageContents" TEXT NOT NULL,
    CONSTRAINT "Message_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_recipientID_fkey" FOREIGN KEY ("recipientID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("id", "recipientID", "senderID", "timeSent") SELECT "id", "recipientID", "senderID", "timeSent" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
