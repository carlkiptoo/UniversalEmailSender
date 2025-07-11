import { Worker, Job } from 'bullmq';
import { emailQueue } from '../services/queue.service';
import { renderTemplate } from '../services/template.service';
import { sendEmailViaProvider } from '../services/email.service';
import IORedis from "ioredis";
import dotenv from 'dotenv';
import { connectToDb } from '../models/db';
import { EmailLog } from '../models/EmailLog.model';


dotenv.config();
connectToDb();

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379', {
    maxRetriesPerRequest: null
});

console.log('worker started');
const worker = new Worker(

    'email-queue',
    async (job: Job) => {
        const { to, from, subject, template, variables } = job.data;
        const jobId = job.id as string;

        console.log(`${jobId} started processing to: ${to.join(', ')}`);

        try {
            const html = await renderTemplate(template, variables);
            const provider = await sendEmailViaProvider({ to, from, subject, html, jobId, requestedAt: new Date() });

            await EmailLog.create({
                jobId,
                to,
                from,
                subject,
                template,
                provider,
                status: 'sent',
                requestedAt: new Date(),
                sentAt: new Date()

            });
            console.log(`${jobId} email sent successfully via ${provider}`);

        } catch (error: any) {
            console.error(`${jobId} failed to send email:`, error.message || error);

            await EmailLog.create({
                jobId,
                to,
                from,
                subject,
                template,
                provider: null,
                status: 'failed',
                error: error.message || error.toString(),
                requestedAt: new Date(),
                sentAt: null
            });

            throw new Error(`Failed to send email via all providers. Last error: ${error.message || error}`);

        }
    },
    { connection }
);

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error ${err.message}`);
})
worker.on('completed', (job) => {
    console.log(`Job ${job?.id} completed`);
})