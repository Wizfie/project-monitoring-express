import { Request, Response, NextFunction } from "express";
import "../types/express";
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => void;
export declare const blacklistToken: (token: string) => void;
//# sourceMappingURL=authMiddleware.d.ts.map