const postService = require("../services/postService");

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.json(posts || []);
};

const addPost = async (req, res) => {
  const savedPost = await postService.addPost(req.body);
  return res.status(201).json(savedPost || {});
};

module.exports = { getAllPosts, addPost };