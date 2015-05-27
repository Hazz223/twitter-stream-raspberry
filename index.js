var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');

app.set('view engine', 'ejs');
app.use(express.static('public'));

var twit = new Twit({
    consumer_key: '7zSD2wslmsXwwmOSUh0U0nMwX',
    consumer_secret: 'hA1cLVnMRkMbMngsdbqgaMs4I1gqoOAn5nCv9lLIPrjjZNqudW',
    access_token: '240623825-Vb63ja1xF0lW5d7wAcrTmzgi5QqJA5Pm2jMIWCD0',
    access_token_secret: 'nGwTJeHWKh6Wd5sQKEHN4z2HdduGHqYay1fhbEm8EtSgc'
});

var stream = twit.stream('statuses/filter', {
    track: '#cat'
});

stream.on('connect', function () {
    console.log('Connecting to Twitter stream...');
});

stream.on('connected', function () {
    console.log('Connected to Twitter stream!!');
});

io.on('connection', function(socket) {
    console.log('new client connected');

    stream.on('tweet', function(tweet) {
        console.log(tweet.text);

        io.emit('tweet', {
            tweet: tweet
        });
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
