const adminController = require("../controllers/adminController.js");

const base = "/api/admin";

const adminRoutes = [
  {
    method: "GET",
    url: base,
    handler: adminController.getAllAdmins,
  },
  {
    method: "POST",
    url: base,
    handler: adminController.addAdmin,
  },
  {
    method: "GET",
    url: `${base}/:id`,
    handler: adminController.getAdminById,
  },
  {
    method: "PUT",
    url: `${base}/:id`,
    handler: adminController.updateAdmin,
  },
  {
    method: "DELETE",
    url: `${base}/:id`,
    handler: adminController.deleteAdmin,
  },
];

module.exports = adminRoutes;
