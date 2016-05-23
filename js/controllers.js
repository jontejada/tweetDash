angular.module('tweetDash.controllers', []).controller('tweetsController', function($scope, $state, $window, Tweets) {
	$scope.userInput="";
	$scope.edit = false;
	$scope.toggleEdit = function() {
		$scope.edit = !$scope.edit;
	};

    $scope.tweetObj = {};

    function getTweets(user) {
        Tweets.query({ user: user }).$promise.then(function(tweetArr) {
            console.log(tweetArr);
            var userName = tweetArr[0].user.screen_name;
            $scope.tweetObj[userName] = [];
            for (var i = 0; i < tweetArr.length; i++) {
                // tweet.retweet = tweetArr[i].retweeted_status ? ;
                var tweet = {};
                //parsing tweet data

                // retweet case
                if (tweetArr[i].retweeted_status) {
                    tweetArr[i] = tweetArr[i].retweeted_status;
                    tweet.rt = tweetArr[i].user.screen_name;
                }

                var elementStart;
                var elementEnd;
                var rawTextArr = tweetArr[i].text.split('');
                //parsing hashtags
                var hashtags = tweetArr[i].entities.hashtags;
                for (var j = 0; j < hashtags.length; j++) {
                    elementStart = '<a href="https://twitter.com/hashtag/' + hashtags[j].text + '"><span class="tag is-info">';
                    elementEnd = '</span></a>';
                    rawTextArr[hashtags[j].indices[0]] = elementStart + rawTextArr[hashtags[j].indices[0]];
                    rawTextArr[hashtags[j].indices[1] - 1] = rawTextArr[hashtags[j].indices[1] - 1] + elementEnd;
                }
                //parsing mentions
                var user_mentions = tweetArr[i].entities.user_mentions;
                for (var k = 0; k < user_mentions.length; k++) {
                    elementStart = '<a href="https://twitter.com/' + user_mentions[k].screen_name + '"><span class="tag is-success">';
                    elementEnd = '</span></a>';
                    rawTextArr[user_mentions[k].indices[0]] = elementStart + rawTextArr[user_mentions[k].indices[0]];
                    rawTextArr[user_mentions[k].indices[1] - 1] = rawTextArr[user_mentions[k].indices[1] - 1] + elementEnd;
                }
                //parsing links
                var urls = tweetArr[i].entities.urls;
                for (var l = 0; l < urls.length; l++) {
                    elementStart = '<a href="' + urls[l].url + '">';
                    elementEnd = '</a>';
                    rawTextArr[urls[l].indices[0]] = elementStart + rawTextArr[urls[l].indices[0]];
                    rawTextArr[urls[l].indices[1] - 1] = rawTextArr[urls[l].indices[1] - 1] + elementEnd;
                }
                //inserting images stored in media array
                var media = tweetArr[i].entities.media || [];
                for (var m = 0; m < media.length; m++) {
                    img = '<img src="' + media[m].media_url + '">';
                    rawTextArr.splice(media[m].indices[0]);
                    rawTextArr.push(img);
                }

                //remove leading '.'
                if (rawTextArr[0] === '.') rawTextArr.shift();

                //rejoin of parsed text, pass into object
                tweet.text = rawTextArr.join('');

                //create moment object for tweet timestamp
                tweet.time = moment(tweetArr[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');

                //set id of tweet
                tweet.id = tweetArr[i].id_str;

                $scope.tweetObj[userName].push(tweet);
            }
        });
    }

    $scope.users = [];

    // function addUser(user) {
    $scope.addUser = function(user) {
        $scope.users.push(user);
        getTweets(user);
        $scope.userInput = '';
    };

    $scope.addUser('AppDirect');
    $scope.addUser('LaughingSquid');
    $scope.addUser('TechCrunch');

    // function removeUser(user) {
    $scope.removeUser = function(user) {
    	$scope.users.splice($scope.users.indexOf(user),1);
    };

    
/*

    // $scope.tweets = Tweets.query();
    $scope.users = ['AppDirect', 'LaughingSquid', 'TechCrunch'];
    if ($scope.users.length > 0) {
        $scope.usersTweets = [];
        for (var i = 0; i < $scope.users.length; i++) {
            var user = $scope.users[i];
            $scope.usersTweets.push(Tweets.query({ user: user }));
        }
    }
    $scope.tweetObj = {};
    angular.forEach($scope.usersTweets, function(userTweets) {
        userTweets.$promise.then(function(tweetArr) {
            // console.log(tweetArr);
            var userName = tweetArr[0].user.screen_name;
            $scope.tweetObj[userName] = [];
            for (var i = 0; i < tweetArr.length; i++) {
                // tweet.retweet = tweetArr[i].retweeted_status ? ;
                var tweet = {};
                //parsing tweet data

                // retweet case
                if (tweetArr[i].retweeted_status) {
                    tweetArr[i] = tweetArr[i].retweeted_status;
                    tweet.rt = tweetArr[i].user.screen_name;
                }

                var elementStart;
                var elementEnd;
                var rawTextArr = tweetArr[i].text.split('');
                //parsing hashtags
                var hashtags = tweetArr[i].entities.hashtags;
                for (var j = 0; j < hashtags.length; j++) {
                    elementStart = '<a href="https://twitter.com/hashtag/' + hashtags[j].text + '"><span class="tag is-info">';
                    elementEnd = '</span></a>';
                    rawTextArr[hashtags[j].indices[0]] = elementStart + rawTextArr[hashtags[j].indices[0]];
                    rawTextArr[hashtags[j].indices[1] - 1] = rawTextArr[hashtags[j].indices[1] - 1] + elementEnd;
                }
                //parsing mentions
                var user_mentions = tweetArr[i].entities.user_mentions;
                for (var k = 0; k < user_mentions.length; k++) {
                    elementStart = '<a href="https://twitter.com/' + user_mentions[k].screen_name + '"><span class="tag is-success">';
                    elementEnd = '</span></a>';
                    rawTextArr[user_mentions[k].indices[0]] = elementStart + rawTextArr[user_mentions[k].indices[0]];
                    rawTextArr[user_mentions[k].indices[1] - 1] = rawTextArr[user_mentions[k].indices[1] - 1] + elementEnd;
                }
                //parsing links
                var urls = tweetArr[i].entities.urls;
                for (var l = 0; l < urls.length; l++) {
                    elementStart = '<a href="' + urls[l].url + '">';
                    elementEnd = '</a>';
                    rawTextArr[urls[l].indices[0]] = elementStart + rawTextArr[urls[l].indices[0]];
                    rawTextArr[urls[l].indices[1] - 1] = rawTextArr[urls[l].indices[1] - 1] + elementEnd;
                }
                //inserting images stored in media array
                var media = tweetArr[i].entities.media || [];
                for (var m = 0; m < media.length; m++) {
                    img = '<img src="' + media[m].media_url + '">';
                    rawTextArr.splice(media[m].indices[0]);
                    rawTextArr.push(img);
                }

                //remove leading '.'
                if (rawTextArr[0] === '.') rawTextArr.shift();

                //rejoin of parsed text, pass into object
                tweet.text = rawTextArr.join('');

                //create moment object for tweet timestamp
                tweet.time = moment(tweetArr[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');

                //set id of tweet
                tweet.id = tweetArr[i].id_str;

                $scope.tweetObj[userName].push(tweet);
            }
            // console.log($scope.tweetObj);
        });
    });

*/

});
