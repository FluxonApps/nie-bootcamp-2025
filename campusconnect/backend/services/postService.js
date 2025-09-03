const Post = require("../models/postModel");

exports.getAllPosts = async () => {
  return await Post.find()
    .populate("user", "name username")
    .populate("comments.user", "name username");
};

exports.addPost = async (postData) => {
  const newPost = new Post(postData);
  return await newPost.save();
};

exports.toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) return null;

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return { likeCount: post.likes.length, post };
};

exports.addComment = async (postId, userId, text) => {
  const post = await Post.findById(postId);
  if (!post) return null;

  post.comments.push({ user: userId, text });
  await post.save();

  return await post.populate("comments.user", "name username");
};
