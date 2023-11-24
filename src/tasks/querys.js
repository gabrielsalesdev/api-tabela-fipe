const cron = require('node-cron');

const task = cron.schedule('* * * * *', async () => {
    console.log('Running cron tasks for insertions');
    try {

    } catch (error) {
        console.error(error);
    }
});

module.exports = task;