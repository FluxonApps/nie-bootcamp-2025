const transactionController = require("../controllers/transactionController.js");

const base = "/api/transactions";

const transactionRoutes = [
  {
    method: "POST",
    url: `${base}/create`,
    handler: transactionController.createOne,
  },
  {
    method: "GET",
    url: `${base}/user/:id`,
    handler: transactionController.getAll,
  },
  {
    method: "PUT",
    url: `${base}/:id`,
    handler: transactionController.updateOne,
  },
  {
    method: "DELETE",
    url: `${base}/:id`,
    handler: transactionController.deleteOne,
  },
];

module.exports = transactionRoutes;
