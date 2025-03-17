import { Project } from "@prisma/client";
export declare const createProject: (project: Project) => Promise<{
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
}>;
export declare const getProjects: () => Promise<{
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
}[]>;
export declare const getProjectById: (id: number) => Promise<{
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
} | null>;
export declare const updateProject: (id: number, project: Project) => Promise<{
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
}>;
export declare const deleteProject: (id: number) => Promise<{
    id: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
}>;
//# sourceMappingURL=projectService.d.ts.map