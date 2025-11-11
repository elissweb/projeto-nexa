/*
  Warnings:

  - You are about to drop the `mensagens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mensagens";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    CONSTRAINT "Mensagem_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
