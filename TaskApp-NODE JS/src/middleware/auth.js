const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).send({
                error: 'Please authenticate'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(
            token,
            'taskappsecret'
        );

        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        res.status(401).send({
            error: 'Please authenticate'
        });
    }
};

module.exports = auth;