const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // ?
const User = require('./registration-model');

//const user = new User();

mongoose.Promise = global.Promise;
const PORT = 8080;
server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
//server.use(express.static('src')); //?

const URL = 'mongodb://localhost:27017/series-advisor'; //?
const db = mongoose.connect(URL, { useNewUrlParser: true });

server.post('/register', (req, res) => {
    console.log(req.body);
    const userBody = {
        email: req.body.email,
        password: bcrypt(req.body.password), //sprawdzic bcrypt
    };
    const user = new User(userBody);

    return user
        .save()
        .then(newUser => {
            res.status(201).send(newUser);
            console.log('elegancko szefie');
        })

        .catch(error => {
            console.log('Opss' + error);
            res.status(400).send(error.errors);
        });
});
server.get('/register', (req, res) => {
    console.log('Nie wiem co robic wiec napisze klasyczne XD');
});

server.listen(PORT, () => {
    console.log('Server is listening on ' + PORT + ' port');
});
