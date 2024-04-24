-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "initiatorSDP" TEXT,
    "answerSDP" TEXT,
    "initiatorID" TEXT NOT NULL,
    "recipientID" TEXT NOT NULL,
    CONSTRAINT "Connection_initiatorID_fkey" FOREIGN KEY ("initiatorID") REFERENCES "ActiveUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_initiatorID_key" ON "Connection"("initiatorID");
