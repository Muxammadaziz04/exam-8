const express = require('express');
const { post, getSinglePost, cancelPost, confirmPost, getPosts, getPendingPosts, getCanceledPosts } = require('../controllers/post.controller.js');
const { checkAdmin } = require('../middlewares/checkToken.js');

const router = express.Router();

router.post('/posts', post)
router.get('/posts', getPosts)
router.get('/pendingPosts', checkAdmin, getPendingPosts)
router.get('/canceledPosts', checkAdmin, getCanceledPosts)
router.get('/posts/:post_id', getSinglePost)
router.get('/cancel/:post_id', checkAdmin, cancelPost)
router.get('/confirm/:post_id', checkAdmin, confirmPost)

module.exports = router