export interface EmailProvider {
    send(payload: {
        to: string[];
        from: string;
        subject: string;
        html: string;

    }): Promise<void>;
}

import {smtpAdapter} from './smtp.adapter';
// import {sesAdapter} from './ses.adapter';
// import {sendgridAdapter} from './sendgrid.adapter';

export const getProviderAdapter = (type: string): EmailProvider => {
    switch (type) {
        case 'smtp':
            return smtpAdapter;
        // case 'ses':
        //     return sesAdapter;
        // case 'sendgrid':
        //     return sendgridAdapter;
        default:
            throw new Error(`Unsupported provider type: ${type}`);
    }
}