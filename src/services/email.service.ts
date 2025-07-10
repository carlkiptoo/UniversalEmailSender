import { getProviderChain } from '../providers/provider.chain';

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
    const providers = getProviderChain();

    let lastError: any = null;


    for (const provider of providers) {
        try {
            await provider.send({ to, from, subject, html });
            console.log(`Email sent successfully via ${provider.constructor.name}`);
            return;
        } catch (error: any) {
            lastError = error;
            console.error('Failed to send email via provider', error);
        }
    }

      throw new Error(`All email providers failed. Last error: ${lastError?.message || lastError}`);

}