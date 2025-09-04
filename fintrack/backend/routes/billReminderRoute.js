const {
  getAllBills,
  getBillById,
  addBill,
  updateBill,
  deleteBill,
} = require('../controllers/billReminderController');

const billReminderRoutes = [
  {
    url: '/api/bills',
    method: 'GET',
    handler: getAllBills,
  },
  {
    url: '/api/bills/:id',
    method: 'GET',
    handler: getBillById,
  },
  {
    url: '/api/bills',
    method: 'POST',
    handler: addBill,
  },
  {
    url: '/api/bills/:id',
    method: 'PUT',
    handler: updateBill,
  },
  {
    url: '/api/bills/:id',
    method: 'DELETE',
    handler: deleteBill,
  },
];

module.exports = billReminderRoutes;
