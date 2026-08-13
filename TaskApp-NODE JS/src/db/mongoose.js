const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/taskapp';

mongoose.connect(connectionURL)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });

module.exports = mongoose;