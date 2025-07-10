import {sesAdapter} from './ses.adapter';
import {smtpAdapter} from './smtp.adapter';
import {EmailProvider} from './base.adapter';
import dotenv from 'dotenv';

dotenv.config();

export const getProviderChain = (): EmailProvider[] =>{
   const providerNames = (process.env.PROVIDER_CHAIN || 'ses,smtp')
        .split(',')
        .map(p => p.trim().toLowerCase());

        const chain: EmailProvider[] = [];

        for (const name of providerNames) {
            switch (name) {
                case 'ses':
                    chain.push(sesAdapter);
                    break;
                case 'smtp':
                    chain.push(smtpAdapter);
                    break;
                default:
                    console.warn(`Unknown provider in chain: ${name}`)
            }
        }

        return chain;
};