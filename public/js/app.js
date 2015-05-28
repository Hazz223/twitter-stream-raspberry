var socket = io();

var tweets = ko.observableArray();

socket.on('tweet', function(data) {
    tweets.push(data.tweet);
});

ko.applyBindings();
