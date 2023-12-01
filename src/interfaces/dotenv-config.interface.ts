export interface DotenvConfig {
    server: {
        port: number | undefined
    },
    knex: {
        client: string | undefined,
        host: string | undefined,
        port: number | undefined,
        database: string | undefined,
        user: string | undefined,
        password: string | undefined
    },
    retry: {
        retries: number | undefined,
        factor: number | undefined,
        minTimeout: number | undefined,
        maxTimeout: number | undefined,
        randomize: boolean | undefined
    }
};