const express = require('express');
const { createPost, getAllPosts, getPostById, deletePost } = require('../controllers/postController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePost);

module.exports = router;
