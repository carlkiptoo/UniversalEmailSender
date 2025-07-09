import { Request, Response, NextFunction } from "express";

export const validateEmail = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {to, from, subject, template, variables} = req.body;

    if (!to || !Array.isArray(to) || to.length === 0) {
        return res.status(400).json({message: 'Field must be a non empty array'});
    }

    if (!from || typeof from !== 'string') {
        return res.status(400).json({message: 'From field is required and must be a string'});
    }

    if (!subject || typeof subject !== 'string') {
        return res.status(400).json({message: 'Subject field is required and must be a string'});
    }

    if (!template || typeof template !== 'string') {
        return res.status(400).json({message: 'Template field is required and must be a string'});
    }

    if (!variables || typeof variables !== 'object') {
        return res.status(400).json({message: 'Variables field is required and must be an object'});
    }

    next();
}