const userRoutes = require("./userRoute");
const productController = require("../controllers/productController");
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
      },
      {
        method: "PATCH",
        path: `${base}/products/:id/approve`,
        handler: [productController.updateProductReview],
      },
      {
        method: "GET",
        path: `${base}/products/:id`,
        handler: [productController.getProductById],
      }

];

module.exports = allRoutes;
