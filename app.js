const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the E-commerce API!' });
});

// Sync Database and Start Server
(async () => {
    try {
        await sequelize.sync(); // Use `{ force: true }` if you want to reset tables during development
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
