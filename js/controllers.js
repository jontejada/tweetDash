angular.module('tweetDash.controllers',[]).controller('tweetsController', function($scope, $state, $window, Tweets){
	// $scope.tweets = Tweets.query();
	$scope.users = ['AppDirect', 'LaughingSquid', 'TechCrunch'];
	if ($scope.users.length > 0) {
		$scope.usersTweets = [];
		for (var i = 0; i < $scope.users.length; i++) {
			var user = $scope.users[i];
			$scope.usersTweets.push(Tweets.query({user: user}));
		}
	}
	$scope.tweetObj = {};
	angular.forEach($scope.usersTweets, function(userTweets) {
		userTweets.$promise.then(function(tweetArr){
				// console.log(tweetArr);
				var userName = tweetArr[0].user.screen_name;
				$scope.tweetObj[userName] = [];
				for (var i = 0; i < tweetArr.length; i++) {
					var tweet = {};
					tweet.text = tweetArr[i].text;
					$scope.tweetObj[userName].push(tweet);
				}
				console.log($scope.tweetObj);
		});
	});
});