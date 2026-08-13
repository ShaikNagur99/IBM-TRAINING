const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// User Signup
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({
            user,
            token
        });

    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

// User Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.send({
            user,
            token
        });

    } catch (error) {
        res.status(400).send({
            error: 'Unable to login'
        });
    }
});

// Get Profile
router.get('/users/me', auth, async (req, res) => {
    res.send({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
    });
});

module.exports = router;