const { User } = require('../models');

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
