const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a task
router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            description: req.body.description,
            completed: req.body.completed || false,
            owner: req.user._id
        });

        await task.save();

        res.status(201).send(task);

    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});


// Get tasks - Filter, Pagination and Sorting
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {
            owner: req.user._id
        };

        // Filter by completed status
        if (req.query.completed !== undefined) {
            match.completed = req.query.completed === 'true';
        }

        // Pagination
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;

        // Sorting
        let sort = {};

        if (req.query.sortBy) {
            const [field, direction] =
                req.query.sortBy.split(':');

            sort[field] = direction === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1;
        }

        const tasks = await Task.find(match)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.send(tasks);

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});


// Get a single task
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send({
                error: 'Task not found'
            });
        }

        res.send(task);

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});


// Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = [
        'description',
        'completed'
    ];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every(
        update => allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        });
    }

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send({
                error: 'Task not found'
            });
        }

        updates.forEach(update => {
            task[update] = req.body[update];
        });

        await task.save();

        res.send(task);

    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});


// Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send({
                error: 'Task not found'
            });
        }

        res.send(task);

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});


module.exports = router;