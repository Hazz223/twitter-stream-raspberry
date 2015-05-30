var socket = io();

var tweets = ko.observableArray();

var maxItems = 8;
var count = 0;

socket.on('tweet', function(data) {
    tweets.push(data.tweet);
    console.log(data);

    // truncate first items if over 5        
    if (tweets().length > maxItems) {
        tweets.shift();
    }
});

ko.applyBindings();
