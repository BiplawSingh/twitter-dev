const express = require('express');
const connect = require('./config/database');

const app = express();

const TweetRepository = require('./repository/tweet-repository');

app.listen(3002, async () => {
    console.log('Server started');
    await connect();
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getAll(2, 4);
    console.log(tweet);
});