const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;

const callBackURL = "https://nepali-year-progress.netlify.app/api/callback";

exports.handler = async function (event, context) {
  const twitterClient = new TwitterApi({
    clientId: "VmZ0MGg1MEtGdnlXVnByal9UNnY6MTpjaQ",
    clientSecret: "YX7APfeyX6B21fPMBPGnE8nXhcbbF5pNH1B4tltfSMhuw5G9WK",
  });

  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callBackURL,
    {
      scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    }
  );

  const response = await fetch(
    "https://nepali-year-progress-default-rtdb.asia-southeast1.firebasedatabase.app/twitterKeys.json",
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
