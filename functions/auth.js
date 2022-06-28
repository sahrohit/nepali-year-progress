const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;

exports.handler = async function () {
	const twitterClient = new TwitterApi({
		clientId: process.env.TWITTER_CLIENT_ID,
		clientSecret: process.env.TWITTER_CLIENT_SECRET,
	});

	const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
		process.env.CALLBACK_URL,
		{
			scope: [
				"tweet.read",
				"tweet.write",
				"users.read",
				"offline.access",
			],
		}
	);

	const response = await fetch(
		`${process.env.DATABASE_URL}/twitterKeys.json`,
		{
			method: "PUT",
			body: JSON.stringify({ codeVerifier, state }),
			headers: { "Content-Type": "application/json" },
		}
	);
	const data = await response.json();

	return {
		statusCode: 200,
		body: JSON.stringify({ url, data, response }),
	};
};
