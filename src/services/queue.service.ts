import { Queue } from "bullmq";
import {v4 as uuidv4} from 'uuid';
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});

const emailQueue = new Queue('email-queue', {connection});

interface EmailJobPayload {
    to: string[];
    from: string;
    subject: string;
    template: string;
    variables: Record<string, any>;
    requestedAt: string;
}

export const queueEmailJob = async (payload: EmailJobPayload) : Promise<string> => {
    const jobId = `email_${uuidv4()}`;

    try {
        await emailQueue.add(jobId, payload, {
            jobId,
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000
            },
            removeOnComplete: true,
            removeOnFail: false

        });
        return jobId;
    } catch (error) {
        console.error('Failed to add job to queue', error);
        throw new Error('Failed to add job to queue');
    }
}

export {emailQueue};