var http = require("http");
var port = 3030;
var serverUrl = "localhost";

var Twit = require('twit');
var ko = require('knockout');

var T = new Twit({
    consumer_key:         '7zSD2wslmsXwwmOSUh0U0nMwX'
  , consumer_secret:      'hA1cLVnMRkMbMngsdbqgaMs4I1gqoOAn5nCv9lLIPrjjZNqudW'
  , access_token:         '240623825-Vb63ja1xF0lW5d7wAcrTmzgi5QqJA5Pm2jMIWCD0'
  , access_token_secret:  'nGwTJeHWKh6Wd5sQKEHN4z2HdduGHqYay1fhbEm8EtSgc'
})

var ViewModel = function(message, user) {
  this.message = ko.observable(message);
  this.user = ko.observable(user);
  
  this.tweet = ko.computed(function() {
    return this.message() + " - " + this.user();
  }, this);
};

var vm = new ViewModel('Test message', 'GP');
var subscription = vm.tweet.subscribe(function(value) {
  console.log(value);
});

var server = http.createServer(function(req, res) { 

//
//  filter the twitter public stream by the hashtag '#raspberrypi' and keyword
//  'raspberry pi'
//
var stream = T.stream('statuses/filter', { track: ['#love', 'love'] });

stream.on('tweet', function (tweet) {
  vm.message(tweet.text);
  vm.user(tweet.user.screen_name);
})
})
console.log("listening at " + serverUrl + ":" + port);
server.listen(port, serverUrl);

