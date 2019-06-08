const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./registration-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.Promise = global.Promise;
const PORT = 8080;
server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const URL = 'mongodb://localhost:27017/series-advisor';
const db = mongoose.connect(URL, { useNewUrlParser: true });

server.post('/register', (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);

    const userBody = {
        email: req.body.email,
        password: hash,
    };

    const user = new User(userBody);

    return user
        .save()
        .then(newUser => {
            res.status(201).send(newUser);
        })

        .catch(error => {
            console.log('Opss' + error);
            res.status(400).send(error.errors);
        });
});
server.get('/register', (req, res) => {});

server.listen(PORT, () => {
    console.log('Server is listening on ' + PORT + ' port');
});
