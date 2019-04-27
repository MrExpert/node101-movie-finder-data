const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

const cache = {};

app.use(morgan('dev'));

app.get('/', (req,res) => {
    if (!!req.query.i) {
        if (!!cache[req.query.i]) {
            console.log('passing Cache if statement')
            res.status(200).json(cache[req.query.i])
        } else {
        axios
            .get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
            .then(response => {
                cache[req.query.i] = response.data;
                res.status(200).json(cache[req.query.i]);
            }).catch (error => {
                console.log('this is error:' + error);
            });
        }    
    } else if (!!req.query.t) {
        if (!!cache[req.query.t]) {
            console.log('passing Cache if statement')
            res.status(200).json(cache[req.query.t])
        } else {
        axios
            .get('http://www.omdbapi.com/?t=' +  encodeURIComponent(req.query.t) + '&apikey=8730e0e')
            .then(response => {
                cache[req.query.t] = response.data;
                res.status(200).json(cache[req.query.t]);
            }).catch (error => {
                console.log('this is error:' + error);
            });
        }    
    } 
});

module.exports = app;