import dotenv from 'dotenv';
import { DotenvConfig } from '../interfaces/dotenv-config.interface';

dotenv.config();

const dotenvConfig: DotenvConfig = {
    server: {
        port: Number(process.env.SERVER_PORT)
    },
    knex: {
        client: process.env.KNEX_CLIENT,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD

    },
    retry: {
        retries: Number(process.env.RETRY_RETRIES),
        factor: Number(process.env.RETRY_FACTOR),
        minTimeout: Number(process.env.RETRY_MIN_TIMEOUT),
        maxTimeout: Number(process.env.RETRY_MAX_TIMEOUT),
        randomize: Boolean(process.env.RETRY_RANDOMIZE)
    }
};

export default dotenvConfig;