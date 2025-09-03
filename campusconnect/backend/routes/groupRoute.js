// routes/groupRoutes.js
const groupController = require("../controllers/groupController");

const base = "/api/groups";

const groupRoute = [
  {
    method: "GET",
    url: base,
    handler: groupController.getAllGroups,
  },
  {
    method: "POST",
    url: base,
    handler: groupController.createGroup,
  },
  {
    method: "POST",
    url: `${base}/:groupId/members`,
    handler: groupController.addMember,
  },
];

module.exports = groupRoute;
