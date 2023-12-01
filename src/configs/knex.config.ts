import { Knex } from 'knex';
import dotenvConfig from './dotenv.config';

const knexConfig: Knex.Config = {
    client: dotenvConfig.knex.client,
    connection: {
        host: dotenvConfig.knex.host,
        port: dotenvConfig.knex.port,
        database: dotenvConfig.knex.database,
        user: dotenvConfig.knex.user,
        password: dotenvConfig.knex.password
    }
};

export default knexConfig;