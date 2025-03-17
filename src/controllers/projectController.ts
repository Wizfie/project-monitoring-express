import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await projectService.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project", error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, status, department, startDate, endDate, createdBy } =
      req.body;

    const updateData: Partial<{
      name: string;
      status: string;
      department: string;
      startDate: Date;
      endDate: Date;
      createdBy: number;
    }> = {};

    if (name) updateData.name = name;
    if (status) updateData.status = status;
    if (department) updateData.department = department;
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (createdBy) updateData.createdBy = createdBy;

    const updatedProject = await projectService.updateProject(
      Number(req.params.id),
      updateData
    );

    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deletedProject = await projectService.deleteProject(
      Number(req.params.id)
    );

    if (deletedProject) {
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
