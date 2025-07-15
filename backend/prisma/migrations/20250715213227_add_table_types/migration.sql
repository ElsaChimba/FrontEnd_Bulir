/*
  Warnings:

  - You are about to drop the column `tableCount` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `tableTypeId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TableType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "tableTypeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_tableTypeId_fkey" FOREIGN KEY ("tableTypeId") REFERENCES "TableType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("clientId", "createdAt", "id", "providerId", "serviceId") SELECT "clientId", "createdAt", "id", "providerId", "serviceId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
