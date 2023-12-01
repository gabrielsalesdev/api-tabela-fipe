import { OperationOptions } from 'retry';
import dotenvConfig from './dotenv.config';

const retryOperationConfig: OperationOptions = {
    retries: dotenvConfig.retry.retries,
    factor: dotenvConfig.retry.factor,
    minTimeout: dotenvConfig.retry.minTimeout,
    maxTimeout: dotenvConfig.retry.maxTimeout,
    randomize: dotenvConfig.retry.randomize
};

export default retryOperationConfig;