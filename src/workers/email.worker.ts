import {Worker, Job} from 'bullmq';
import {emailQueue} from '../services/queue.service';
import {renderTemplate} from '../services/template.service';
import {sendEmailViaProvider} from '../services/email.service';
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const worker = new Worker(
    'email-queue',
    async (job: Job) => {
        const {to, from, subject, template, variables} = job.data;

        console.log(`${job.id} started processing to: ${to.join(', ')}`);

        const html = await renderTemplate(template, variables);

        await sendEmailViaProvider({to, from, subject, html});

        console.log(`${job.id} completed processing to: ${to.join(', ')}`);
    },
    {connection}
);

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error ${err.message}`);
})
worker.on('completed', (job) => {
    console.log(`Job ${job?.id} completed`);
})