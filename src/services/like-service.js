import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {

    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    // /api/v1/likes/toggle?id=modelid&type=Tweet (or type can be Comment also)
    async toggleLike(modelId, modelType, userId) {
        if(modelType === "Tweet") {
            var likeable = await this.tweetRepository.find(modelId);
        } else if(modelType === "Comment") {
            // later
        } else {
            throw new Error("Unknown model type");
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if(exists) {
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.deleteOne();

            var isAdded = true;
        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isAdded = false;
        }
        return isAdded;
    }
}

export default LikeService;