-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL
);
