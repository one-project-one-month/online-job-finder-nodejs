import { v4 as uuidv4 } from "uuid";

export const companies = [
  {
    userId: 1,
    companyName: "Tech Solutions Ltd.",
    phone: "+1-800-123-4567",
    website: "https://techsolutions.com",
    address: "1234 Silicon Valley, CA, USA",
    locationId: uuidv4(),
    description:
      "A leading software development company specializing in AI solutions.",
    version: 1,
  },
  {
    userId: 1,
    companyName: "Data Innovators Inc.",
    phone: "+44-20-7946-0123",
    website: "https://datainnovators.com",
    address: "5678 Big Data St, London, UK",
    locationId: uuidv4(),
    description: "Experts in data science, analytics, and AI-powered insights.",
    version: 1,
  },
  {
    userId: 1,
    companyName: "Marketing Gurus LLC",
    phone: "+33-1-2345-6789",
    website: "https://marketinggurus.com",
    address: "4321 Digital Blvd, Paris, France",
    locationId: uuidv4(),
    description: "A digital marketing agency helping businesses grow online.",
    version: 1,
  },
];
