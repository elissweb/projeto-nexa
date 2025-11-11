-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "foto_de_perfil" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Questionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resposta" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questionarioId" INTEGER NOT NULL,
    CONSTRAINT "Resposta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resposta_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mensagem" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "profissionaisId" INTEGER NOT NULL,
    CONSTRAINT "Chat_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chat_profissionaisId_fkey" FOREIGN KEY ("profissionaisId") REFERENCES "Profissionais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horario" DATETIME NOT NULL,
    "chatId" INTEGER NOT NULL,
    CONSTRAINT "mensagens_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profissionais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_gmail_key" ON "Usuario"("gmail");
