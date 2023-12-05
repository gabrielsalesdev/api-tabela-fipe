import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port: string | undefined = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));