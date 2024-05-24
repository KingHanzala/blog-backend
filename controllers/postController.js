const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
