import { Queue } from "bullmq";
import {v4 as uuidv4} from 'uuid';
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const emailQueue = new Queue('email-queue', {connection});

interface EmailJobPayload {
    to: string[];
    from: string;
    subject: string;
    template: string;
    variables: Record<string, any>;
    requestedAt: string;
}

