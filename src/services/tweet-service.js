import { TweetRepository, HashtagRepository } from '../repository/index.js';

class TweetService {

    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)?.map(tag => tag.substring(1).toLowerCase()) || [];

        const tweet = await this.tweetRepository.create(data);

        const existingTags = await this.hashtagRepository.findByName(tags);
        const existingTagTitles = existingTags.map(tag => tag.title);
        const newTags = tags.filter(tag => !existingTagTitles.includes(tag));

        const newTagObjects = newTags.map(tag => ({ title: tag, tweets: [tweet._id] }));
        const savedNewTags = await this.hashtagRepository.bulkCreate(newTagObjects);

        await Promise.all(existingTags.map(tag => {
            tag.tweets.push(tweet._id);
            return tag.save();
        }));

        tweet.hashtags = [...existingTags.map(tag => tag._id), ...savedNewTags.map(tag => tag._id)];
        await tweet.save();

        return tweet;
    }
}

export default TweetService;