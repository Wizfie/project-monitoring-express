import { Task } from "@prisma/client";
import prisma from "../config/db";

export const createTask = async (task: Task) => {
  const newTask = await prisma.task.create({
    data: task,
  });
  return newTask;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const updateTask = await prisma.task.update({
    where: { id },
    data: task,
  });
  return updateTask;
};

export const getTask = async () => {
  const task = await prisma.task.findMany();
  return task;
};

export const getById = async (id: number) => {
  const taskById = await prisma.task.findUnique({
    where: { id },
  });
  return taskById;
};

export const deleteTask = async (id: number) => {
  const deletedTask = await prisma.task.update({
    where: { id },
    data: { isDeleted: true },
  });
  return deletedTask;
};
