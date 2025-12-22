-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "TeacherName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
