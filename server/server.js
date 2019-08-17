const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const auth = require('./middleWare/createSession.js');
const db = require('./../database/databaseHelpers.js');
const request = require('request')
const cookieParser = require('cookie-parser');

app.use(require('morgan')('dev'));
app.use(cookieParser())
app.use(express.static(__dirname + '/../public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(auth.createSession);

// ******************* GET *******************

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

    if (req.body) {
        var searchParam = req.body.input.toString().toLowerCase();

        console.log("SearchParam:", `https://pokeapi.co/api/v2/pokemon/${searchParam}`);

        request.get(`https://pokeapi.co/api/v2/pokemon/${searchParam}`, (err, data) => {
            if (err) {
                throw err;
            }

            if (data.body && data.body !== 'Not Found') {
                res.end(JSON.parse(data.body).toString());
            } else {
                res.end('Not Found');
            }
        })
    } else {
        res.end('No data input');
    }
})

//Return pokemon data (serach by id)
app.get('/getAllPokemon', (req, res, next) => {
    console.log('searching...');
    request.get('https://pokeapi.co/api/v2/pokemon/?limit=20000', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('success');
        if (data.body !== 'Not Found') {
            res.json(JSON.parse(data.body));
        } else {
            res.end('Not Found')
        }
    })
})

app.get('/testCookies', auth.verifySession, (req, res, next) => {
    console.log('cookies: ', req.cookies);
    res.end();
})

app.get('/login', (req, res, next) => {
    res.send('login page');
})

app.post('/login', (req, res, next) => {
    res.send('login post');
app.get('/testSQL', (req, res, next) => {

    db.createUser('test', () => {
        db.createPokemonInstance('25', 'test', null, null, (err, results) => {
            console.log("ERROR:", err);
            console.log("RESULTS:", results);
            res.end('test');
        })
    })
})

// ******************* POST *******************
app.post('/addPokemonToUser', (req, res, next) => {
    console.log(req.body)
    var user = req.body.username;
    var pokemonId = req.body.pokemonId;
    var name = req.body.name;
    var level = req.body.level;

    db.createPokemonInstance(pokemonId, user, name, level, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Pokemon instance created");
        }
    })
})

app.listen(port, () => {
    console.log("Listening on port:", port);
});