export declare const registerUser: (username: string, password: string, department: string, role: string) => Promise<{
    id: number;
    username: string;
    password: string;
    department: string;
    active: boolean;
    createdAt: Date;
    role: import(".prisma/client").$Enums.Role;
}>;
export declare const loginUser: (username: string, password: string) => Promise<string>;
//# sourceMappingURL=authService.d.ts.map