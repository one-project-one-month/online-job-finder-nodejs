import prisma from "../../database/index.js";

export const skillCreate = async (data) => {
  const { name, version, description } = data;
  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: data.name },
    });
    if (existingSkill) {
      throw new Error("Skill with this name already exists.");
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        version: version || 1,
        description: description || null,
      },
    });
    return skill;
  } catch (error) {
    throw new Error("Failed to create skill");
  }
};

export const getSkills = async () => {
  try {
    const skills = await prisma.skill.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return skills;
  } catch (error) {
    throw new Error("Fail to fetch skills");
  }
};

export const getSkillById = async (skillId) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      select: {
        id: true,
        name: true,
      },
    });
    return skill;
  } catch (error) {
    throw new Error("Fail to fetch location");
  }
};

export const updateSkill = async (skillId, data) => {
  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: data.name },
    });
    if (existingSkill) {
      throw new Error("Skill with this name already exists.");
    }

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        ...data,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return skill;
  } catch (error) {
    console.log(error);

    throw new Error("Fail to update skill", error);
  }
};

export const destorySkill = async (skillId) => {
  try {
    const skill = await prisma.skill.delete({
      where: { id: skillId },
    });
    return skill;
  } catch (error) {
    throw new Error("Fail to delete skill");
  }
};
