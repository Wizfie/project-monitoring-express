"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const db_1 = __importDefault(require("../config/db"));
const createProject = async (project) => {
    const newProject = await db_1.default.project.create({
        data: project,
    });
    return newProject;
};
exports.createProject = createProject;
const getProjects = async () => {
    const projects = await db_1.default.project.findMany();
    return projects;
};
exports.getProjects = getProjects;
const getProjectById = async (id) => {
    const project = await db_1.default.project.findUnique({
        where: { id },
    });
    return project;
};
exports.getProjectById = getProjectById;
const updateProject = async (id, project) => {
    const updatedProject = await db_1.default.project.update({
        where: { id },
        data: project,
    });
    return updatedProject;
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    const deletedProject = await db_1.default.project.delete({
        where: { id },
    });
    return deletedProject;
};
exports.deleteProject = deleteProject;
