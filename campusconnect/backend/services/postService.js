const Post = require("../models/postModel");

// Create Post
exports.createPost = async (caption, author, imageUrl) => {
  if (!caption ) {
    throw new Error("Caption and  is required");
  }

  const post = new Post({
    caption,
    author,
    imageUrl: imageUrl || null,
  });

  await post.save();
  return post;
};

// Get all posts
exports.getAllPosts = async () => {
  const posts = await Post.find()
    .populate("author", "name email")
    .populate("comments.userId", "name email")
    .sort({ createdAt: -1 });

  return posts;
};

// Like Post
exports.likePost = async (postId, userId) => {
  if (!userId) throw new Error("userId is required");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return post.likes;
};

// Add comment
exports.commentPost = async (postId, userId, text) => {
  if (!userId || !text) throw new Error("userId and text are required");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const newComment = { userId, text };
  post.comments.push(newComment);
  await post.save();

  return newComment;
};

// Optional: Get all comments for a post
exports.getComments = async (postId) => {
  const post = await Post.findById(postId).populate("comments.userId", "name email");
  if (!post) throw new Error("Post not found");

  return post.comments;
};

// Get all comments for a post
exports.getComments = async (postId) => {
  const post = await Post.findById(postId).populate("comments.userId", "name email");
  if (!post) throw new Error("Post not found");
  return post.comments;
};
