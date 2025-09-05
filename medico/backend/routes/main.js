const userRoutes = require("./userRoute");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const base = "/api";
const allRoutes = [
    {
      method: "GET",
      path: `${base}/products/search`,
      handler: [productController.searchApprovedProducts],
    },
    {
      method: "GET",
      path: `${base}/products/`,
      handler: productController.getApprovedProducts,
      },
      {
        method: "POST",
        path: `${base}/products`,
        handler: [productController.createProduct],
      },
      {
        method: "DELETE",
        path: `${base}/products/:id`,
        handler: [productController.deleteProduct],
      },
      {
        method: "GET",
        path: `${base}/products/unapproved`,
        handler: [productController.getUnApprovedProducts],
      },
      {
        method: "PUT",
        path: `${base}/products/approve/:id`,
        handler: [productController.approveProduct],
      }
];

const authRoutes = require("./authRoutes");
allRoutes.push(
  { method: "POST", path: "/api/auth/signup", handler: authController.signup },
  { method: "POST", path: "/api/auth/login", handler: authController.login },
  { method: "POST", path: "/api/auth/favorites", handler: [authMiddleware, authController.addFavorite] },
  { method: "GET", path: "/api/auth/favorites", handler: [authMiddleware, authController.getFavorites] }
);


module.exports = allRoutes;
