const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const url = 'http://www.omdbapi.com/?apikey=8730e0e&';
const encode = encodeURIComponent;

let cache = {};

app.use(morgan('dev'));


app.get('/', function(req, res) {
    let param = '';
    let key = '';


    if (req.query.hasOwnProperty('i')) {
        key = req.query.i;
        param = 'i=' + encode(key);
    } else if (req.query.hasOwnProperty('t')) {
        key = req.query.t;
        param = 't=' + encode(key);
    }
    if (cache.hasOwnProperty(key)) {
        res.json(cache[key]);
    } else {
        console.log(url + param);
        axios.get(url + param)
            .then(function(response) {
                console.log(response);
                cache[key] = response.data;
                res.json(cache[key]);
            });
    };
});
app.get('/data', function(req, res) {
    res.json(cache);
})
module.exports = app;

