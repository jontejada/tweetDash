var screenName = 'techcrunch';
$.getJSON('http://' + window.location.hostname + ':7890/1.1/statuses/user_timeline.json?count=30&screen_name=' + screenName, function(data) {
	var spanStart;
	var spanEnd;
	var photoStart;
	var photoEnd;
	for (var i = 0; i < data.length; i++) {
		var retweet = '';
		if (data[i].retweeted_status) {
			data[i] = data[i].retweeted_status;
			retweet = ' retweeted <a class="button is-success" href="https://twitter.com/' + data[i].user.screen_name + '">@' + data[i].user.screen_name + '</a>';
		}
		var rawTextArr = data[i].text.split('');
		var hashtags = data[i].entities.hashtags;
		for (var j = 0; j < hashtags.length; j++) {
			spanStart = '<a href="https://twitter.com/hashtag/' + hashtags[j].text + '"><span class="tag is-info">';
			spanEnd = '</span></a>';
			rawTextArr[hashtags[j].indices[0]] = spanStart + rawTextArr[hashtags[j].indices[0]];
			rawTextArr[hashtags[j].indices[1] - 1] = rawTextArr[hashtags[j].indices[1] - 1] + spanEnd;
		}
		var user_mentions = data[i].entities.user_mentions;
		for (var k = 0; k < user_mentions.length; k++) {
			spanStart = '<a href="https://twitter.com/' + user_mentions[k].screen_name + '"><span class="tag is-success">';
			spanEnd = '</span></a>';
			rawTextArr[user_mentions[k].indices[0]] = spanStart + rawTextArr[user_mentions[k].indices[0]];
			rawTextArr[user_mentions[k].indices[1] - 1] = rawTextArr[user_mentions[k].indices[1] - 1] + spanEnd;
		}
		var urls = data[i].entities.urls;
		for (var l = 0; l < urls.length; l++) {
			linkStart = '<a href="'+ urls[l].url +'">';
			linkEnd = '</a>';
			rawTextArr[urls[l].indices[0]] = linkStart + rawTextArr[urls[l].indices[0]];
			rawTextArr[urls[l].indices[1] - 1] = rawTextArr[urls[l].indices[1] - 1] + linkEnd;
		}
		//media work
		var media = data[i].entities.media || [];
		for (var m = 0; m < media.length; m++) {
			img = '<img src="' + media[m].media_url +  '">';
			rawTextArr.splice(media[m].indices[0]);
			rawTextArr.push(img);
		}
		if (rawTextArr[0] === '.') rawTextArr.shift();
		var timeStamp = moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
		var label = '<span class="tweetLabel"><a class="button is-success" href="https://twitter.com/' + screenName + '">@' + screenName + '</a>' + retweet + '</span>';
		$('#list').append(label +'<li class="box">' + rawTextArr.join('') + '<br>' + '<span class="notes"><a href="http://twitter.com/statuses/' + data[i].id_str + '"><i class="fa fa-twitter fa-lg"></i></a>' + timeStamp.fromNow() + ' (' + timeStamp.format('M/D h:ma') + ')' +  '</span></li>');
	}
});



// var taggedText = data[i].text.replace()




