const postService = require("../services/postService");


const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.json(posts || []);
};


const addPost = async (req, res) => {
  const savedPost = await postService.addPost(req.body);
  return res.status(201).json(savedPost || {});
};

const toggleLike = async (req, res) => {
  const result = await postService.toggleLike(req.params.postId, req.body.userId);
  if (!result) return res.status(404).json({ error: "Post not found" });
  return res.json(result);
};

const addComment = async (req, res) => {
  const post = await postService.addComment(
    req.params.postId,
    req.body.userId,
    req.body.text
  );
  if (!post) return res.status(404).json({ error: "Post not found" });
  return res.json(post);
};

module.exports = { getAllPosts, addPost, toggleLike, addComment };
