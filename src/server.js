const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

const mongoURI = 'mongodb://localhost:27017/movieadvisor';

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Users = require('./routes/User');
// console.log(Users);
app.use('/users', Users);

app.listen(port, function() {
    console.log('Server is running on port: ' + port);
});
