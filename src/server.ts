import app from './app';
import dotenvConfig from './config/dotenv.config';

const port: string = dotenvConfig.server.port as string;

app.listen(port, () => console.log(`Server is running on port ${port}`));