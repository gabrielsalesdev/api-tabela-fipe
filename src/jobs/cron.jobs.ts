import cron from 'node-cron';

export default cron.schedule('* * * * *', async () => {
    console.log('Running cron tasks');
    try {

    } catch (error) {
        console.error(error);
    }
});