const express = require('express');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
    request('https://www.google.com', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body)
        }
    })
})

app.listen(3000, function() {
    console.log('omdb-api is running');
    console.log('listening on 3000');
})