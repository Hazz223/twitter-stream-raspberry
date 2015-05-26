var http = require("http");
var port = 3030;
var serverUrl = "192.168.1.91";

var Twit = require('twit')

var T = new Twit({
    consumer_key:         '7zSD2wslmsXwwmOSUh0U0nMwX'
  , consumer_secret:      'hA1cLVnMRkMbMngsdbqgaMs4I1gqoOAn5nCv9lLIPrjjZNqudW'
  , access_token:         '240623825-Vb63ja1xF0lW5d7wAcrTmzgi5QqJA5Pm2jMIWCD0'
  , access_token_secret:  'nGwTJeHWKh6Wd5sQKEHN4z2HdduGHqYay1fhbEm8EtSgc'
})

var server = http.createServer(function(req, res) { 

var stream = T.stream('statuses/filter', { track: ['#love', 'love'] });

stream.on('tweet', function (tweet) {
  var tweet = "<p>" + tweet.text + " (" + tweet.user.screen_name  + ") </p>";
  res.end(tweet); });
})

console.log("listening at " + serverUrl + ":" + port);
server.listen(port, serverUrl);

