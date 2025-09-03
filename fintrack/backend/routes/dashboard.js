const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');

router.get('/summary', getDashboardSummary);

module.exports = router;
