import { getProviderChain } from '../providers/provider.chain';
import {EmailLog} from '../models/EmailLog.model';

interface SendEmailPayload {
    to: string[];
    from: string;
    subject: string;
    html: string;
    jobId: string;
    requestedAt: Date;
}

export const sendEmailViaProvider = async ({
    to,
    from,
    subject,
    html
}: SendEmailPayload): Promise<string> => {
    const providers = getProviderChain();

    let lastError: any = null;


    for (const provider of providers) {
        try {
            await provider.send({ to, from, subject, html });
            await EmailLog.create({
                to,
                from,
                subject,
                html,
                provider: provider.name,
                status: 'sent',
            })
            console.log(`Email sent successfully via ${provider.name}`);
            return provider.name;
        } catch (error: any) {
            lastError = error;
            await EmailLog.create({
                to,
                from,
                subject,
                html,
                provider: provider.name,
                status: 'failed',
            })

            console.error(`Error sending email via ${provider.name}:`, error.message || error);
        }
    }

      throw new Error(`All email providers failed. Last error: ${lastError?.message || lastError}`);

}