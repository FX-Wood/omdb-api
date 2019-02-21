const express = require('express');
const request = require('request');
require('dotenv').config();
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
    let qs = {
        s: 'star wars',
        apikey: process.env.API_KEY
    }
    request({
        url: 'https://www.omdbapi.com',
        qs: qs
    }, function (error, response, body) {
        console.log('trying')
        if (!error && response.statusCode == 200) {
            let dataObj = JSON.parse(body);
            res.render('results', {results: dataObj.Search});
        } else {
            console.log(response.statusCode)
            console.log('fail')
        }
    });
});

app.listen(process.env.PORT || 3000
    , function() {
        console.log('omdb-api is running');
        console.log('listening on: port', process.env.PORT || 3000);
        console.log('Your api key:', process.env.API_KEY)
})