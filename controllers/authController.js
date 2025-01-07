const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};



// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.key, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.logout = async (req, res) => {
    // Clear the token from cookies (if used)
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
    // Respond to the client
    res.status(200).json({ message: 'User logged out successfully' });
};
