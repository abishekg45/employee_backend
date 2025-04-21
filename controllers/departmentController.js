const pool = require('../db/db');

exports.getDepartmentList = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, department_name FROM department ORDER BY id');
    res.json({
      status: 'success',
      message: 'Department list retrieved successfully',
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Error fetching department list',
      error: err.message
    });
  }
};
