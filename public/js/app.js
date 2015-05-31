var socket = io();

var tweets = ko.observableArray();

var maxItems = 10;
var count = 0;

socket.on('tweet', function(data) {
    tweets.push(data.tweet);

    // truncate first items if over max number of items        
    if (tweets().length > maxItems) {
        tweets.shift();
    }
});

ko.applyBindings();