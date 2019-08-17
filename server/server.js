const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const auth = require('./middleWare/createSession.js');
const db = require('./../database/databaseHelpers.js');
const cookieParser = require('cookie-parser');

app.use(require('morgan')('dev'));
app.use(cookieParser())
app.use(express.static(__dirname + '/../public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(auth.createSession);

app.get('/createUser', (req, res, next) => {
    /*db.createUser('test', () => {
        db.createSession('test', 'aaaaaa', () => {
            db.getSessionByUsername('test', (err, results) => {
                console.log(results);
                res.end('hit');
            });
        });
    });*/
});

//Return pokemon data (serach by id)
app.get('/getPokemon', (req, res, next) => {
    console.log(req);
    var searchParam = req.body.input.toString().toLowerCase();
    console.log(req.body)
    console.log("SearchParam:", `https://pokeapi.co/api/v2/pokemon/${searchParam}`);

    req.get(`http://pokeapi.co/api/v2/pokemon/${searchParam}`, (err, data) => {
        if (err) {
            throw err;
        }
        console.log('returning');
        if (data.body !== 'Not Found') {
            res.end(JSON.parse(data.body).toString());
        } else {
            res.end('Not Found')
        }
    })
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