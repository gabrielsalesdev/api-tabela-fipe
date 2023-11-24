require('dotenv').config();
const app = require('./app');
const port = process.env.SERVER_PORT;

const querysTask = require('./tasks/querys');

querysTask.start();

app.listen(port, () => console.log(`Server is running on port ${port}`));