const billReminderController = require("../controllers/billReminderController");

const base = "/api/bill-reminders";

const billReminderRoutes = [
  {
    method: "POST",
    url: base,
    handler: billReminderController.createBillReminder,
  },
];

module.exports = billReminderRoutes;
