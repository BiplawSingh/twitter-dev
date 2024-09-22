import express from 'express';
import { connect } from './config/database.js';

const app = express();

// import service from './services/tweet-service.js'

app.listen(3002, async () => {
    console.log('Server started');
    await connect();
    // let ser = new service();
    // await ser.create({content: 'Done with #refactoring, had so #much #fun, new #tweEt'});
});