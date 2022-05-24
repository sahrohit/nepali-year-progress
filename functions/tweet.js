const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;

exports.handler = async function (event, context) {
	const response = await fetch(
		"https://twitter-bot-7b17a-default-rtdb.asia-southeast1.firebasedatabase.app/demo.json"
	);
	const { refreshToken } = await response.json();

	const twitterClient = new TwitterApi({
		clientId: "VmZ0MGg1MEtGdnlXVnByal9UNnY6MTpjaQ",
		clientSecret: "YX7APfeyX6B21fPMBPGnE8nXhcbbF5pNH1B4tltfSMhuw5G9WK",
	});

	const {
		client: refreshedClient,
		accessToken,
		refreshToken: newRefreshToken,
	} = await twitterClient.refreshOAuth2Token(refreshToken);

	const putResponse = await fetch(
		"https://twitter-bot-7b17a-default-rtdb.asia-southeast1.firebasedatabase.app/demo.json",
		{
			method: "put",
			body: JSON.stringify({
				accessToken,
				refreshToken: newRefreshToken,
			}),
			headers: { "Content-Type": "application/json" },
		}
	);
	const data = await putResponse.json();

	const result = await refreshedClient.v2.tweet(
		`This is being tweeted every hour ?. ${new Date().toISOString()}`
	);

	return {
		statusCode: 200,
	};
};
