const categoryController = require("../controllers/categoryController");

const categoryRoutes = [
  {
    method: "GET",
    url: "/api/categories",
    handler: categoryController.getCategories,
  },
];

module.exports = categoryRoutes;
