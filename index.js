var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var config = require('./config');
var path = require('path');

app.set('view engine', 'ejs');
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

var twit = new Twit(config.twitter);
var hashtag = config.hashtag;

var stream = twit.stream('statuses/filter', {
    track: hashtag
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