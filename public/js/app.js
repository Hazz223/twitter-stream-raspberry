var socket = io();

var tweets = ko.observableArray();

var maxItems = 100;
var count = 0;

socket.on('tweet', function(data) {
    tweets.unshift(data.tweet);
    // truncate first items if over max number of items
    if (tweets().length > maxItems) {
        tweets.shift();
    }
});

ko.applyBindings();
