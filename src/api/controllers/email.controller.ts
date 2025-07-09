import { Request, Response } from "express";
import {queueEmailJob} from '../../services/queue.service';

export const sendEmailController = async (req: Request, res: Response) => {
    const {to, from, subject, template, variables} = req.body;

    try {
        const jobId = await queueEmailJob({
            to, from, subject, template, variables, requestedAt: new Date().toISOString()
        });

        return res.status(202).json({
            message: 'Email request accepted and queued',
            jobId
        });

    } catch (error) {
        console.error('Failed to queue email job', error);
        throw new Error('Unabale to queue email request');
    }
}