require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db/ConnectionDb');
const authRoutes = require('./routes/authRouter');
const productRoutes = require('./routes/productRoutes');
const newArrivalRoutes = require('./routes/newarrivalRoutes');

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Verilənlər bazasına qoşulma
connection();

// Marşrutları təyin etmək
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/newarrivals', newArrivalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Serveri dinləmə
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
