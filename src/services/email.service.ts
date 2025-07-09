import { get } from 'http';
import {getProviderAdapter} from '../providers/base.adapter';


interface SendEmailPayload {
    to: string[];
    from: string;
    subject: string;
    html: string;
}

export const sendEmailViaProvider = async ({
    to,
    from,
    subject,
    html
}: SendEmailPayload): Promise<void> => {
    try {
        const provider = getProviderAdapter(process.env.PROVIDER || 'smtp');
        await provider.send({to, from, subject, html});
    } catch(error:  any) {
        console.error('Failed to send email via provider', error);
        throw new Error('Failed to send email via provider');
    }

}