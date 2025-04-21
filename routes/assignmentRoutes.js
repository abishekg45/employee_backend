const express = require('express');
const router = express.Router();
const {
  assignEmployee,
  updateAssignment,
  deleteAssignment,
  getAllAssignments
} = require('../controllers/assignmentController');

const verifyToken = require('../middleware/authMiddleware');

router.post('/assign', verifyToken, assignEmployee);
router.put('/update/:id', verifyToken, updateAssignment);
router.delete('/delete/:id', verifyToken, deleteAssignment);
router.get('/all', verifyToken, getAllAssignments);

module.exports = router;
