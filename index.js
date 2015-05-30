var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var config = require('./config');

app.set('view engine', 'ejs');
app.use(express.static('public'));

var twit = new Twit(config.twitter);

var stream = twit.stream('statuses/filter', {
    track: '#food'
});

stream.on('connect', function () {
    console.log('Connecting to Twitter stream...');
});

stream.on('connected', function () {
    console.log('Connected to Twitter stream!!');
});

io.on('connection', function(socket) {
    console.log('new client connected');

    socket.on('disconnect', function() {
        console.log('client disconnected');
    });
});

stream.on('tweet', function(tweet) {
    // console.log(tweet.text);
    io.emit('tweet', {
        tweet: tweet
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});