import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {createClient} from 'redis';
import dotenv from 'dotenv';
import { send } from 'process';

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379',
})

redisClient.connect().catch(console.error);


export const rateLimitMiddleware = rateLimit({
    store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.sendCommand(args),
        prefix: 'email-rate-limit'
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});