var x = new Date();
console.log('script start');
$.getJSON('http://' + window.location.hostname + ':7890/1.1/statuses/user_timeline.json?count=30&screen_name=appdirect', function(data) {
	console.log(new Date() - x);
	var spanStart;
	var spanEnd;
	var photoStart;
	var photoEnd;
	for (var i = 0; i < data.length; i++) {
		if (data[i].retweeted_status) {
			data[i] = data[i].retweeted_status;
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
			console.log(urls[l].url);
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
		$('#list').append('<li class="box">' + rawTextArr.join('') + '<br>' + moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow() + '<a href="http://twitter.com/statuses/' + data[i].id_str + '"><i class="fa fa-twitter fa-lg"></i></a>' + '</li>');
		// $('#list').append('<li class="box">' + rawTextArr.join('') + '<br>' + moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow() + '<a href="http://twitter.com/statuses/' + data[i].id_str + '">Link</a>' + '</li>');
	}
});



// var taggedText = data[i].text.replace()




