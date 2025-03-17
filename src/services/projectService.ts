import prisma from "../config/db";
import { Project } from "@prisma/client";

export const createProject = async (project: any) => {
  const startDate = new Date(project.startDate + "T00:00:00.000Z");
  const endDate = new Date(project.endDate + "T00:00:00.000Z");

  const newProject = await prisma.project.create({
    data: {
      name: project.name,
      status: project.status,
      department: project.department,
      startDate: startDate,
      endDate: endDate,
      createdBy: project.createdBy,
    },
  });
  return newProject;
};

export const getProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

export const updateProject = async (
  id: number,
  updateData: Partial<Project>
) => {
  try {
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate + "T00:00:00.000Z");
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate + "T00:00:00.000Z");
    }

    // Update project in the database with the normalized date values
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
    });
    return updatedProject;
  } catch (error) {
    throw new Error("Error updating project");
  }
};

export const deleteProject = async (id: number) => {
  const deletedProject = await prisma.project.update({
    where: { id },
    data: { isDeleted: true },
  });
  return deletedProject;
};
