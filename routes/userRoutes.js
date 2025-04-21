const express = require('express');
const router = express.Router();
const { getUserList } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/list', verifyToken, getUserList);

module.exports = router;
