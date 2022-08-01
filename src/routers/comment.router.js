const express = require('express');
const { postComment, deleteComment } = require('../controllers/comment.controller');
const { checkToken } = require('../middlewares/checkToken');

const router = express.Router();

router.post('/comment', checkToken, postComment)
router.delete('/comment/:comment_id', checkToken, deleteComment)

module.exports = router