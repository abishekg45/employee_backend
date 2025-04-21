const pool = require('../db/db');

exports.getUserList = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users ORDER BY id');
    res.json({
      status: 'success',
      message: 'User list retrieved successfully',
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Error fetching user list',
      error: err.message
    });
  }
};
