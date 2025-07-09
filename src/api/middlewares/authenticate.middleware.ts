import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization header is required'});
    }

    const token = authHeader.split(' ')[1];

    if (!token || token !== process.env.API_KEY) {
        return res.status(401).json({message: 'Invalid API key'});
    }
    next();
}