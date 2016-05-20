angular.module('tweetDash',['ui.router','ngResource', 'tweetDash.controllers','tweetDash.services']);
angular.module('tweetDash').config(function($stateProvider, $httpProvider) {
	$stateProvider.state('tweets', {
		url: '/tweets',
		templateUrl: 'partials/tweets.html', 
		controller: 'tweetsController'
	}).state('viewUser', {
		url: '/users/:name',
		templateUrl: 'partials/user.html', 
		controller: 'userController'
	});
}).run(function($state){
	$state.go('tweets');
});