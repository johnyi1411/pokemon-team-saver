const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./../database/databaseHelpers.js');
const cookieParser = require('cookie-parser');

app.use(require('morgan')('dev'));
app.use(cookieParser())
app.use(express.static(__dirname + '/../public'))

app.get('/createUser', (req, res, next) => {
    // db.createUser('test');
    db.createSession('test', 'aaaaaa');
    res.end('hit');
})

app.get('/testCookies', (req, res, next) => {
    console.log('cookies: ', req.cookies);
    console.log('length: ', Object.keys(req.cookies).length);
    res.cookie('testCookie', 123456789);
    res.end();
})

app.listen(port, () => {
    console.log("Listening on port:", port);
});