const pool = require('../db/db');

// CREATE: Assign employee to department
exports.assignEmployee = async (req, res) => {
  const { user_id, department_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO employee_department (user_id, department_id)
       VALUES ($1, $2) RETURNING *`,
      [user_id, department_id]
    );
    res.status(201).json({
      status: 'success',
      message: 'Employee assigned to department',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Error assigning employee',
      error: err.message
    });
  }
};

// UPDATE: Edit assignment
exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { user_id, department_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE employee_department SET user_id = $1, department_id = $2 WHERE id = $3 RETURNING *`,
      [user_id, department_id, id]
    );
    res.json({
      status: 'success',
      message: 'Assignment updated',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Error updating assignment',
      error: err.message
    });
  }
};

// DELETE: Unassign
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM employee_department WHERE id = $1`, [id]);
    res.json({
      status: 'success',
      message: 'Assignment deleted'
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Error deleting assignment',
      error: err.message
    });
  }
};

// GET: All assignments with details
exports.getAllAssignments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        ed.id AS assignment_id,
        u.id AS employee_id,    
        u.email AS email,    
        u.username AS employee_name,
        d.id AS department_id,
        d.department_name
      FROM employee_department ed
      JOIN users u ON ed.user_id = u.id
      JOIN department d ON ed.department_id = d.id
      ORDER BY ed.id`
    );
    res.json({
      status: 'success',
      message: 'Assignments retrieved successfully',
      data: result.rows
    });
  } catch (err) { 
    res.status(500).json({
      status: 'failed',
      message: 'Error retrieving assignments',
      error: err.message
    });
  }
};
