const express = require('express');
const router = express.Router();
const commentRatingController = require('../controllers/commentRatingController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, commentRatingController.addCommentRating);
router.get('/gym/:gymId', commentRatingController.getCommentRatingsForGym);

module.exports = router;