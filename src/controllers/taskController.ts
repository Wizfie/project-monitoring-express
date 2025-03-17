import * as taskService from "../services/taskService";
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskName, pic } = req.body;

    const updateData: Partial<{
      taskName: string;
      pic: number;
    }> = {};

    if (taskName) updateData.taskName = taskName;
    if (pic) updateData.pic = pic;

    const updatedTask = await taskService.updateTask(
      Number(req.params.id),
      updateData
    );

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};
