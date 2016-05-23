angular.module('tweetDash',['ui.router', 'ngSanitize', 'ngResource', 'tweetDash.controllers','tweetDash.services']);
angular.module('tweetDash').config(function($stateProvider, $httpProvider) {
	$stateProvider.state('tweets', {
		url: '/tweets',
		templateUrl: 'partials/tweets.html', 
		controller: 'tweetsController'
	}).state('users', {
		url: '/users',
		templateUrl: 'partials/users.html', 
		controller: 'tweetsController'
	});
}).run(function($state){
	$state.go('tweets');
});