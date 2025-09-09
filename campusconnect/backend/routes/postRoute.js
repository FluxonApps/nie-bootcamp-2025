const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

// Export routes as an array of route objects
const postRoutes = [
  {
    method: "post",

    url: "/api/posts",

  },
  {
    method: "post",

    url: "/api/posts",

    handler: postController.createPost // actual handler
  },
  {
    method: "get",

    url: "/api/get/posts",

    handler: postController.getAllPosts
  },
  {
    method: "post",

    url: "/api/posts/:postId/like",

    handler: postController.likePost
  },
  {
    method: "post",

    url: "/api/posts/:postId/comment",

    handler: postController.commentPost
  },
  {
    method: "get",

    url: "/api/posts/:postId/comments",

    handler: postController.getComments // new route to fetch all comments
  }
];

module.exports = postRoutes;
