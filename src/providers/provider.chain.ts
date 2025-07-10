import {sesAdapter} from './ses.adapter';
import {smtpAdapter} from './smtp.adapter';
import {EmailProvider} from './base.adapter';

export const getProviderChain = (): EmailProvider[] =>{
    return [
        sesAdapter,
        smtpAdapter
    ];

};