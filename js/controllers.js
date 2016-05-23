angular.module('tweetDash.controllers', []).controller('tweetsController', function($scope, $state, $window, Tweets) {
	$scope.userInput="";
	$scope.edit = false;
	$scope.toggleEdit = function() {
		$scope.edit = !$scope.edit;
	};
    $scope.tweetObj = {};
    function getTweets(user) {
        //use the Tweets factory to make an request to the twitter-proxy server
        Tweets.query({ user: user }).$promise.then(function(tweetArr) {
            var userName = tweetArr[0].user.screen_name;
            $scope.tweetObj[userName] = [];
            for (var i = 0; i < tweetArr.length; i++) {
                var tweet = {};
                //parsing returned tweet data

                // in the case of a retweet
                if (tweetArr[i].retweeted_status) {
                    tweetArr[i] = tweetArr[i].retweeted_status;
                    tweet.rt = tweetArr[i].user.screen_name;
                }

                //prepare raw text for modification. will be sanitized and passed in with ngBindHtml. 
                var rawTextArr = tweetArr[i].text.split('');
                var elementStart;
                var elementEnd;

                //insert hashtags links and tag formatting
                var hashtags = tweetArr[i].entities.hashtags;
                for (var j = 0; j < hashtags.length; j++) {
                    elementStart = '<a href="https://twitter.com/hashtag/' + hashtags[j].text + '"><span class="tag is-info">';
                    elementEnd = '</span></a>';
                    rawTextArr[hashtags[j].indices[0]] = elementStart + rawTextArr[hashtags[j].indices[0]];
                    rawTextArr[hashtags[j].indices[1] - 1] = rawTextArr[hashtags[j].indices[1] - 1] + elementEnd;
                }
                //insert mention links and tag formatting
                var user_mentions = tweetArr[i].entities.user_mentions;
                for (var k = 0; k < user_mentions.length; k++) {
                    elementStart = '<a href="https://twitter.com/' + user_mentions[k].screen_name + '"><span class="tag is-success">';
                    elementEnd = '</span></a>';
                    rawTextArr[user_mentions[k].indices[0]] = elementStart + rawTextArr[user_mentions[k].indices[0]];
                    rawTextArr[user_mentions[k].indices[1] - 1] = rawTextArr[user_mentions[k].indices[1] - 1] + elementEnd;
                }
                //insert text links 
                var urls = tweetArr[i].entities.urls;
                for (var l = 0; l < urls.length; l++) {
                    elementStart = '<a href="' + urls[l].url + '">';
                    elementEnd = '</a>';
                    rawTextArr[urls[l].indices[0]] = elementStart + rawTextArr[urls[l].indices[0]];
                    rawTextArr[urls[l].indices[1] - 1] = rawTextArr[urls[l].indices[1] - 1] + elementEnd;
                }
                //insert images stored in media array
                var media = tweetArr[i].entities.media || [];
                for (var m = 0; m < media.length; m++) {
                    img = '<img src="' + media[m].media_url + '">';
                    rawTextArr.splice(media[m].indices[0]);
                    rawTextArr.push(img);
                }

                //remove leading period for cleaner tweet formatting
                // (the leading period is a way to mention other users without having twitter recognnize it as a conversation)
                if (rawTextArr[0] === '.') rawTextArr.shift();

                //rejoin text array into string, pass into tweet object
                tweet.text = rawTextArr.join('');

                //generate a Moment.js object for the tweet timestamp
                tweet.time = moment(tweetArr[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');

                //set id of tweet from the javascript safe id_str field
                tweet.id = tweetArr[i].id_str;

                $scope.tweetObj[userName].push(tweet);
            }
        });
    }

    $scope.users = [];
    $scope.addUser = function(user) {
        if(user) {
            $scope.users.push(user);
            getTweets(user);
            $scope.userInput = '';
        }
    };
    $scope.addUser('AppDirect');
    $scope.addUser('LaughingSquid');
    $scope.addUser('TechCrunch');

    $scope.removeUser = function(user) {
    	$scope.users.splice($scope.users.indexOf(user),1);
    };
});
