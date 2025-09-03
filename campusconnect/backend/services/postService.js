const Post = require("../models/postModel");

exports.getAllPosts = async () => {
  const posts = await Post.find();
  return posts || [];
};

exports.addPost = async (post) => {
  try {
    const newPost = new Post(post);
    return await newPost.save();
  } catch (err) {
    console.log("Error saving new post", err);
    return;
  }
};