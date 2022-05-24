const fetch = require("node-fetch");
exports.handler = async function (event, context) {
  const response = await fetch(
    "https://twitter-bot-7b17a-default-rtdb.asia-southeast1.firebasedatabase.app/test.json",
    {
      method: "put",
      body: JSON.stringify({
        accessToken: "Buy the milk",
        refreshToken: "Buy the bread too",
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      event: JSON.stringify(event),
      context: JSON.stringify(context),
      data: JSON.stringify(data),
    }),
  };
};
