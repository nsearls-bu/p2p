-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActiveUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "expiresIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActiveUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ActiveUser" ("id", "userID", "username") SELECT "id", "userID", "username" FROM "ActiveUser";
DROP TABLE "ActiveUser";
ALTER TABLE "new_ActiveUser" RENAME TO "ActiveUser";
CREATE UNIQUE INDEX "ActiveUser_userID_key" ON "ActiveUser"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
