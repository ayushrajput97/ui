// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User  not found');
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;