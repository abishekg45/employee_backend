const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // or use '*' for all
  credentials: true
}));


app.use('/api/auth', authRoutes);


const assignmentRoutes = require('./routes/assignmentRoutes');
app.use('/api/assignments', assignmentRoutes);

const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);


// test protected route
const authMiddleware = require('./middleware/authMiddleware');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you accessed a protected route!` });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
