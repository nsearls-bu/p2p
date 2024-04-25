-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderID" TEXT NOT NULL,
    "recipientID" TEXT NOT NULL,
    "timeSent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageContents" TEXT NOT NULL,
    CONSTRAINT "Message_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_recipientID_fkey" FOREIGN KEY ("recipientID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("id", "messageContents", "recipientID", "senderID", "timeSent") SELECT "id", "messageContents", "recipientID", "senderID", "timeSent" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
