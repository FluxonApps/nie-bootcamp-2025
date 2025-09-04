const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

// Export routes as an array of route objects
const postRoutes = [
  {
    method: "post",
    url: "/posts",
    handler: upload.single("image") // middleware for image upload
  },
  {
    method: "post",
    url: "/posts",
    handler: postController.createPost // actual handler
  },
  {
    method: "get",
    url: "/posts",
    handler: postController.getAllPosts
  },
  {
    method: "post",
    url: "/posts/:postId/like",
    handler: postController.likePost
  },
  {
    method: "post",
    url: "/posts/:postId/comment",
    handler: postController.commentPost
  },
  {
    method: "get",
    url: "/posts/:postId/comments",
    handler: postController.getComments // new route to fetch all comments
  }
];

module.exports = postRoutes;
