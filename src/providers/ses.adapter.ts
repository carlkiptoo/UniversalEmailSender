import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { EmailProvider } from './base.adapter';
import dotenv from 'dotenv';

dotenv.config();

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    },
});

export const sesAdapter: EmailProvider = {
    send: async ({ to, from, subject, html }) => {
        const command = new SendEmailCommand({
            Source: from,
            Destination: {
                ToAddresses: to,
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: html,
                    },
                },
            },
        });
        await sesClient.send(command);

    },
};