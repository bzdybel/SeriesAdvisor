const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./registration-model');
const bcrypt = require('bcrypt');
const validator = require('validator');

mongoose.Promise = global.Promise;
const PORT = 8080;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const DB_URL = 'mongodb://localhost:27017/series-advisor';
const db = mongoose.connect(DB_URL, { useNewUrlParser: true });

server.post('/register', (req, res) => {
    //  const emailCount = db.users.find({ email: req.body.email }).count;
    if (
        req.body.password !== req.body.passwordRepeat ||
        req.body.password.length < 6 ||
        validator.isEmail(req.body.email) === false
        //    ||emailCount > 0
    ) {
        console.log('Podane dane są nieprawidłowe');
    } else {
        const hash = bcrypt.hashSync(req.body.password, 10);

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
                console.log(`Opss' + ${error}`);
                res.status(400).send(error.errors);
            });
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`);
});
