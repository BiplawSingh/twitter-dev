import express from "express";

import { createTweet, getTweetWithComments } from "../../controllers/tweet-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
import { createComment } from "../../controllers/comment-controller.js";
import { signup } from "../../controllers/auth-controller.js";

const router = express.Router();
router.post("/tweets", createTweet);
router.get('/tweets/:id', getTweetWithComments);

router.post("/likes/toggle", toggleLike);

router.post("/comments", createComment);

router.post("/signup", signup);

export default router;
