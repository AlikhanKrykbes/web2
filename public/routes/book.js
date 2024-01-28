
const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/', (req, res) => {
    const iPath = path.resolve(__dirname, '../views/book.html');
    res.sendFile(iPath);
});

module.exports = route;