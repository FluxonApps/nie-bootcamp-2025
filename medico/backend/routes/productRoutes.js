const productController = require("../controllers/productController");

const productRoutes = [
    {
      method: "GET",
      path: '/',
      handler: productController.getProducts,
      },
      {
        method: "GET",
        path: 'getAprovedProducts/',
        handler: productController.getApprovedProducts,
      },
    {
    method: "GET",
    path: `/:id`,
    handler: [productController.getProductById],
    },

    {
      method: "POST",
      path: '/',
      handler: [productController.createProduct],
    },
    {
      method: "PUT",
      path: `/:id`,
      handler: [productController.updateProduct],
    },
    {
      method: "DELETE",
      path: `/:id`,
      handler: [productController.deleteProduct],
    },
    {
      method: "GET",
      path: '/search',
      handler: [productController.searchAprovedProducts],
    },
];

module.exports = productRoutes;