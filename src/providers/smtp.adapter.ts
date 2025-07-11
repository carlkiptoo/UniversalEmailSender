import nodemailer from 'nodemailer';
import { EmailProvider } from './base.adapter';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv';

dotenv.config();

console.log('SMTP config', {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
})

const smtpConfig: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

export const smtpAdapter: EmailProvider = {
    name: 'SMTP Adapter',
    send: async ({ to, from, subject, html }) => {
        await transporter.sendMail({
            from,
            to,
            subject,
            html
        });
    }
}