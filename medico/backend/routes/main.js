const userRoutes = require("./userRoute");
const productController = require("../controllers/productController");
const base = "/api";
const allRoutes = [
    {
      method: "GET",
      path: `${base}/products/search`,
      handler: [productController.searchAprovedProducts],
    },
    {
      method: "GET",
      path: `${base}/products/`,
      handler: productController.getApprovedProducts,
      },
    {
      method: "GET",
      path: `${base}/products:id`,
      handler: [productController.getProductById],
      },
      {
        method: "POST",
        path: `${base}/products`,
        handler: [productController.createProduct],
      },
      {
        method: "PUT",
        path: `${base}/products/:id`,
        handler: [productController.updateProduct],
      },
      {
        method: "DELETE",
        path: `${base}/products/:id`,
        handler: [productController.deleteProduct],
      },
];

module.exports = allRoutes;
