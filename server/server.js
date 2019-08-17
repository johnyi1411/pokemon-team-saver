const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./../database/databaseHelpers.js');

app.use(express.static(__dirname + '/../public'))

app.get('/createUser', (req, res, next) => {
    // db.createUser('test');
    db.createSession('test', 'aaaaaa');
    res.end('hit');
})

app.listen(port, () => {

    console.log("Listening on port:", port);
});