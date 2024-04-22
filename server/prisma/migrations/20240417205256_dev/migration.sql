-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ConversationsOnUsers" (
    "userID" TEXT NOT NULL,
    "conversationID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "conversationID"),
    CONSTRAINT "ConversationsOnUsers_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConversationsOnUsers_conversationID_fkey" FOREIGN KEY ("conversationID") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderID" TEXT NOT NULL,
    "recipientID" TEXT NOT NULL,
    "timeSend" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversationID" TEXT,
    CONSTRAINT "Message_conversationID_fkey" FOREIGN KEY ("conversationID") REFERENCES "Conversation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
