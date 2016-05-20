angular.module('tweetDash.services',[]).factory('Tweets', function($resource) {
	return $resource('http://' + window.location.hostname + ':7890/1.1/statuses/user_timeline.json?count=30&screen_name=:user', {user: 'user'});
});