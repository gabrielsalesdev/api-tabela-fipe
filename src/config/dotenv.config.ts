import dotenv from 'dotenv';
dotenv.config();

const dotenvConfig = {
    server: {
        port: process.env.SERVER_PORT
    },
    cache: {
        key: process.env.CACHE_KEY
    }
};

export default dotenvConfig;
