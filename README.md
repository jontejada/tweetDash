#tweetDash


json response body:

- array of 30 TWEET objects
	- `created_at` string: UTC time of tweet creation. "dd MMM DD HH:mm:ss ZZ YYYY" format. this string is passed to Moment.JS for parsing into a useful date output (properly rendered timestamp and elapsed time)
	- `id` integer: this is a signed 64 bit value, which cannot be reliably used in JavaScript becuase of the limitations of Numbers in JavaScript (https://dev.twitter.com/overview/api/twitter-ids-json-and-snowflake)
	-  `id_str` string: same integer value as `id`, but passed and used as a string. works with JavaScript. direct link to tweet can be built from `https://twitter.com/statuses/` + `id_str`
	- `text` string: actual tweet. native retweets may end up shortened, but the full text can be extracted from the `text` string in the `retweeted_status` object
	- `entities` object holding metadata in several arrays
		- `hashtag` array of HASHTAG objects
			- `text` string
			- `indicies` array of two integers
		- `symbols` array
		- `user_mentions` array of USER-like objects
			- `screen_name` string
			- `name` string
			- `id_str` string.
			- `incicies` array of two integers
		- `urls` array of URL objects
			- `url` t.co string
			- `expanded_url` full string
			- `display url` (shortened invalid) display url string
			- `indicies` array of two integers
		- `media` array of MEDIA objects (https://dev.twitter.com/overview/api/entities-in-twitter-objects#media)
			- `id_str` stirng
			- `indicies` array of two integers
			- `media_url` string
			- `display_url` string
			- `sizes` object (can request specific sizes)
	- `user` object
		- `id_str` string
		- `name` string
		- `screen_name` string
		- `location` string
		- `description` string
		- `url` t.co string
		- `entities` object 
		- `profile_image_url` string: link to user's 48px x 48px png icon 
	- `retweeted_status` object exists if tweet is a retweet
		- similar data to a normal tweet object
