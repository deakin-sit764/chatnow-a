const express = require('express');
const app = express();

require('dotenv').config({silent: true});

app.use(express.static('public'));

var server = require('./app');

app.listen(process.env.PORT || 8080, () => console.log("Running Good!"));
