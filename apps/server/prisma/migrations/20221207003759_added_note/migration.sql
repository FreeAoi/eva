-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "note" INTEGER NOT NULL DEFAULT 0,
    "studentId" TEXT,
    CONSTRAINT "Courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Courses" ("createdAt", "id", "name", "studentId", "updatedAt") SELECT "createdAt", "id", "name", "studentId", "updatedAt" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
