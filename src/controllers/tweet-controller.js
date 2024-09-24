import TweetService from "../services/tweet-service.js";
import upload from "../config/file-upload-s3-config.js";

const multipleUploader = upload.array("images", 5);

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    multipleUploader(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const payload = { ...req.body };

      if (req.files && req.files.length > 0) {
        payload.images = req.files.map(file => file.location);
      }

      const response = await tweetService.create(payload);
      return res.status(201).json({
        success: true,
        message: "Successfully created a new tweet with images",
        data: response,
        err: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};

export const getTweetWithComments = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched a tweet",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};
