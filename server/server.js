const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // ?

const User = require('./registration-model');
const user = new User();

mongoose.Promise = global.Promise;
const PORT = 8080;
server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//server.use(express.static('src')); //? 

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization')"
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
    );
    next();
});
const URL = 'mongodb://localhost:27017/series-advisor'; //?
const db = mongoose.connect(URL, { useNewUrlParser: true });

//?
server.post('/register', (req, res) => {
    console.log(req.email);
    console.log(req.password);
    console.log(req.passwordRepeat);
    const user = {
        email: req.email,
        password: req.password,
        passwordRepeat: req.passwordRepeat,
    };

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
// server.get('/register', (req, res) => {
//     console.log(res.email);
//     console.log(res.password);
//     console.log(res.passwordRepeat);
//     console.log('Nie wiem co robic wiec napisze klasyczne XD');
// });

server.listen(PORT, () => {
    console.log('Server is listening on ' + PORT + ' port');
});
