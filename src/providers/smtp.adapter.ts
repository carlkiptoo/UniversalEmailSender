import nodemailer from 'nodemailer';
import {EmailProvider} from './base.adapter';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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
    send: async ({to, from, subject, html}) => {
        await transporter.sendMail({
            from,
            to,
            subject,
            html
        });
    }
}