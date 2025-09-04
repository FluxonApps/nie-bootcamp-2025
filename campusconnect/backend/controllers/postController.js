const postService = require("../services/postService");

exports.createPost = async (req, res) => {
  try {
    const { caption} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const post = await postService.createPost(caption, imageUrl);
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Create Post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const likes = await postService.likePost(postId, userId);
    res.status(200).json({ message: "Post liked successfully", likes });
  } catch (error) {
    console.error("Like Post error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    const comment = await postService.commentPost(postId, userId, text);
    res.status(200).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error("Comment Post error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await postService.getComments(postId);
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Get Comments error:", error);
    res.status(500).json({ message: error.message });
  }
};

