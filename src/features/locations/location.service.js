import prisma from "../../database/index.js";

export const createLocation = async (data) => {
  const { name, version, description } = data;
  try {
    // Check if location name already exists
    const existingLocation = await prisma.location.findUnique({
      where: { name: data.name },
    });

    if (existingLocation) {
      throw new Error("Location with this name already exists.");
    }

    // Logic to create a new location
    const location = await prisma.location.create({
      data: {
        name,
        version: version || 1,
        description: description || "",
      },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to create location.");
  }
};

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return locations;
  } catch (error) {
    throw new Error("Failed to fetch locations.");
  }
};

export const getLocationById = async (locationId) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: locationId },
      select: {
        id: true,
        name: true,
      },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to fetch location.");
  }
};

export const updateLocation = async (locationId, data) => {
  try {
    const existingLocation = await prisma.location.findUnique({
      where: { name: data.name },
    });

    if (existingLocation) {
      throw new Error("Location with this name already exists.");
    }

    const location = await prisma.location.update({
      where: { id: locationId },
      data: {
        ...data,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to update location.", error.message);
  }
};

export const destoryLocation = async (locationId) => {
  try {
    const location = await prisma.location.delete({
      where: { id: locationId },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to delete location.");
  }
};
