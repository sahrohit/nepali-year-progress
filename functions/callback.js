const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;

exports.handler = async function (event, context) {
	const twitterClient = new TwitterApi({
		clientId: "VmZ0MGg1MEtGdnlXVnByal9UNnY6MTpjaQ",
		clientSecret: "YX7APfeyX6B21fPMBPGnE8nXhcbbF5pNH1B4tltfSMhuw5G9WK",
	});

	const callBackURL =
		"http://127.0.0.1:8888/api/callback";

	const { state, code } = event.queryStringParameters;

	const response = await fetch(
		"https://nepali-year-progress-default-rtdb.asia-southeast1.firebasedatabase.app/twitterKeys.json"
	);
	const { codeVerifier, state: storedState } = await response.json();

	if (state != storedState) {
		return {
			statusCode: 200,
			body: "Keys didn't match",
		};
	}

	const {
		client: loggedClient,
		accessToken,
		refreshToken,
	} = await twitterClient.loginWithOAuth2({
		code,
		codeVerifier,
		redirectUri: callBackURL,
	});

	const putResponse = await fetch(
		"https://nepali-year-progress-default-rtdb.asia-southeast1.firebasedatabase.app/twitterKeys.json",
		{
			method: "PUT",
			body: JSON.stringify({ accessToken, refreshToken }),
			headers: { "Content-Type": "application/json" },
		}
	);
	const data = await putResponse.json();

	return {
		statusCode: 200,
	};
};
