const express = require('express');
const middleware = require('./config/app-middleware');
const constants = require('./config/constants');
const path = require("path");

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

middleware(app);

app.listen(constants.PORT || 3001, () => {
    console.log("Server Created for port Number : " + constants.PORT);
});

