/*
  Warnings:

  - You are about to drop the column `location` on the `ApplicantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `ApplicantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `ApplicantSkill` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `industryId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ApplicantIndustry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Industry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedJob` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skillId` to the `ApplicantSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `jobCategoryId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfPosts` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Remote', 'OnSite', 'Hybrid');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Open', 'Close');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Seen', 'Accepted', 'Rejected');

-- DropForeignKey
ALTER TABLE "ApplicantIndustry" DROP CONSTRAINT "ApplicantIndustry_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicantIndustry" DROP CONSTRAINT "ApplicantIndustry_industryId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_industryId_fkey";

-- DropForeignKey
ALTER TABLE "JobAttachment" DROP CONSTRAINT "JobAttachment_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobQuestion" DROP CONSTRAINT "JobQuestion_jobId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileAttachment" DROP CONSTRAINT "ProfileAttachment_profileId_fkey";

-- DropForeignKey
ALTER TABLE "SavedJob" DROP CONSTRAINT "SavedJob_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "SavedJob" DROP CONSTRAINT "SavedJob_jobId_fkey";

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_companyId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "ApplicantEducation" ALTER COLUMN "fieldOfStudy" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "stillAttending" DROP DEFAULT,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ApplicantExperience" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "currentlyWorking" DROP DEFAULT,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ApplicantProfile" DROP COLUMN "location",
DROP COLUMN "resume",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "locationId" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ApplicantSkill" DROP COLUMN "skill",
ADD COLUMN     "skillId" TEXT NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "resumeId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CompanyProfile" DROP COLUMN "location",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "locationId" TEXT,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "endDate",
DROP COLUMN "industryId",
DROP COLUMN "location",
DROP COLUMN "startDate",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "jobCategoryId" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "numOfPosts" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "JobType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "JobStatus" NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "applicantId",
DROP COLUMN "companyId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "version" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isComplete",
DROP COLUMN "role",
ADD COLUMN     "isInformationCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "ApplicantIndustry";

-- DropTable
DROP TABLE "Industry";

-- DropTable
DROP TABLE "JobAttachment";

-- DropTable
DROP TABLE "JobQuestion";

-- DropTable
DROP TABLE "ProfileAttachment";

-- DropTable
DROP TABLE "SavedJob";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicantJobCategory" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "industryId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicantJobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSkill" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantProfile" ADD CONSTRAINT "ApplicantProfile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfile" ADD CONSTRAINT "CompanyProfile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantJobCategory" ADD CONSTRAINT "ApplicantJobCategory_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "ApplicantProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantJobCategory" ADD CONSTRAINT "ApplicantJobCategory_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "JobCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantSkill" ADD CONSTRAINT "ApplicantSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobCategoryId_fkey" FOREIGN KEY ("jobCategoryId") REFERENCES "JobCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
