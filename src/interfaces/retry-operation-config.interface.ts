export interface RetryOperationConfig {
    retries: number,
    factor: number,
    minTimeout: number,
    maxTimeout: number,
    randomize: boolean
};