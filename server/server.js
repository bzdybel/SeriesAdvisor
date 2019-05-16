const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // ?
const User = require('./registration-model');

mongoose.Promise = global.Promise;
const PORT = 8080;
server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static('src')); //?

const URL = 'mongodb://localhost:27017/series-advisor'; //?
const db = mongoose.connect(URL, { useNewUrlParser: true });

//?
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'App.jsx'));
});

server.listen(PORT, () => {
    console.log('Server is listening on ' + PORT + ' port');
});
