const billReminderController = require("../controllers/billReminderController");

const base = "/api/bill-reminders";

const billReminderRoutes = [
  {
    method: "POST",
    url: base,
    handler: billReminderController.createBillReminder,
  },
  {
    method: "GET",
    url: base,
    handler: billReminderController.getBillReminders,
  },
  {
    method: "DELETE",
    url: `${base}/:id`,
    handler: billReminderController.deleteBillReminder,
  },
];

module.exports = billReminderRoutes;
