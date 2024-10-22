require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRouter');
const connection = require('./db/ConnectionDb');
const productRoutes = require('./routes/productRoutes');
const newarrivalRoutes = require('./routes/newarrivalRoutes');

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use('/uploads', express.static('uploads'));

connection();

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', newarrivalRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
