const postController = require("../controllers/postController.js");

const base = "/api/posts";

const postRoutes = [
  {
    method: "GET",
    url: base,
    handler: postController.getAllPosts,
  },
  {
    method: "POST",
    url: base,
    handler: postController.addPost,
  },
  {
    method: "PUT",
    url: `${base}/:postId/like`,
    handler: postController.toggleLike,
  },
  {
    method: "POST",
    url: `${base}/:postId/comment`,
    handler: postController.addComment,
  },
];

module.exports = postRoutes;
