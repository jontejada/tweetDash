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
});