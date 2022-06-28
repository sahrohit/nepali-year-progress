const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;

exports.handler = async function (event) {
	const twitterClient = new TwitterApi({
		clientId: process.env.TWITTER_CLIENT_ID,
		clientSecret: process.env.TWITTER_CLIENT_SECRET,
	});

	const { state, code } = event.queryStringParameters;

	const response = await fetch(
		`${process.env.DATABASE_URL}/twitterKeys.json`
	);
	const { codeVerifier, state: storedState } = await response.json();

	if (state != storedState) {
		return {
			statusCode: 200,
			body: "Keys didn't match",
		};
	}

	const { accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
		code,
		codeVerifier,
		redirectUri: process.env.CALLBACK_URL,
	});

	const putResponse = await fetch(
		`${process.env.DATABASE_URL}/twitterKeys.json`,
		{
			method: "PUT",
			body: JSON.stringify({ accessToken, refreshToken }),
			headers: { "Content-Type": "application/json" },
		}
	);
	await putResponse.json();

	return {
		statusCode: 200,
	};
};
