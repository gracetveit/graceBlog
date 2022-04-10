-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "pwHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
