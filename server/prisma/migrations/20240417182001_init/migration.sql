-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "birthday" DATETIME,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT
);
INSERT INTO "new_User" ("birthday", "cell", "city", "email", "firstName", "id", "image", "lastName", "password", "postalCode", "state", "street", "username") SELECT "birthday", "cell", "city", "email", "firstName", "id", "image", "lastName", "password", "postalCode", "state", "street", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
