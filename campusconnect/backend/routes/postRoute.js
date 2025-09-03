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
];

module.exports = postRoutes;