const express = require('express');
const connect = require('./config/database');

const app = express();

const TweetRepository = require('./repository/tweet-repository');

app.listen(3002, async () => {
    console.log('Server started');
    await connect();
});