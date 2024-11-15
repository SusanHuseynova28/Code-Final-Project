require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db/ConnectionDb');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const newArrivalRoutes = require('./routes/newarrivalRoutes');
const latestRoutes = require('./routes/latestRoutes');
const articleRoutes = require('./routes/articleRoutes');
const wishlistRoutes = require("./routes/wishlistRoutes");
const filterRoutes = require("./routes/filterRoutes");
const faqRoutes = require('./routes/faqRoutes');


if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connection();

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/newarrivals', newArrivalRoutes);
app.use('/api/latest', latestRoutes);
app.use('/articles', articleRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api", filterRoutes);
app.use('/api', faqRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
