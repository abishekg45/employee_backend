const express = require('express');
const router = express.Router();
const { getDepartmentList } = require('../controllers/departmentController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/list', verifyToken, getDepartmentList);

module.exports = router;
