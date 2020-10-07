const express = require('express');
const users_router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
users_router.use(cors());

process.env.SECRET_KEY = 'secret';

users_router.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const userData = {
        email: req.body.email,
        password: hash,
    };
    try {
        const result = await User.findOne({
            email: req.body.email,
        });
        if (result) {
            return res.status(400).send({
                message: 'Email already taken',
                code: 'E_VALIDATION',
            });
        }
        const createdUser = await User.create(userData);
        return res.status(201).send(createdUser);
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            code: 'E_INTERNAL',
            message: "Couldn't create a user",
        });
    }
});

users_router.post('/login', async (req, res) => {
    try {
        const result = await User.findOne({ email: req.body.email });
        if (!result) {
            return res.status(400).send({
                message: 'User with provided email does not exist',
                code: 'E_VALIDATION',
            });
        } else {
            if (!bcrypt.compareSync(req.body.password, result.password)) {
                return res.status(400).send({
                    message: 'Provided password is incorrect',
                    code: 'P_VALIDATION',
                });
            } else {
                const payload = {
                    _id: result._id,
                    email: result.email,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440,
                });
                return res.status(200).send(token);
            }
        }
    } catch (e) {
        console.log(e);
    }
});

users_router.get('/profile', async (req, res) => {
    try {
        const decoded = jwt.verify(
            req.headers['authorization'],
            process.env.SECRET_KEY
        );

        const result = await User.findOne({ _id: decoded._id });
        if (result) {
            res.json(result);
        } else {
            res.send('User does not exist');
        }
    } catch (e) {
        res.status(401).send('error: ' + e);
    }
});

module.exports = users_router;
