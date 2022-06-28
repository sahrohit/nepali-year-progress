const fetch = require("node-fetch");
const TwitterApi = require("twitter-api-v2").default;
const { schedule } = require("@netlify/functions");
const NepaliDate = require("nepali-date");

const handler = async function () {
	const now = new NepaliDate(
		new Date(
			new Date(Date.now()).getTime() +
				new Date(Date.now()).getTimezoneOffset() * 60000 +
				3600000 * "+5.75"
		)
	);
	const currentYear = +now.format("YYYY");
	const diff =
		(now.getTime() - new NepaliDate(currentYear, 0, 0).getTime()) /
		(new NepaliDate(currentYear + 1, 0, 0).getTime() -
			new NepaliDate(currentYear, 0, 0).getTime());

	const roundedDiff = Math.floor(diff * 100);

	const response = await fetch(`${process.env.DATABASE_URL}/lastTweet.json`);
	const { percentage } = await response.json();

	function repeat(s, i) {
		var r = "";
		for (var j = 0; j < i; j++) r += s;
		return r;
	}

	function make_bar(p, bar_style, min_size, max_size) {
		var d,
			full,
			m,
			middle,
			r,
			rest,
			x,
			min_delta = Number.POSITIVE_INFINITY,
			full_symbol = bar_style[bar_style.length - 1],
			n = bar_style.length - 1;
		if (p == 100) return { str: repeat(full_symbol, 10), delta: 0 };
		p = p / 100;
		for (var i = max_size; i >= min_size; i--) {
			x = p * i;
			full = Math.floor(x);
			rest = x - full;
			middle = Math.floor(rest * n);
			if (p != 0 && full == 0 && middle == 0) middle = 1;
			d = Math.abs(p - (full + middle / n) / i) * 100;
			if (d < min_delta) {
				min_delta = d;
				m = bar_style[middle];
				if (full == i) m = "";
				r =
					repeat(full_symbol, full) +
					m +
					repeat(bar_style[0], i - full - 1);
			}
		}
		return { str: r, delta: min_delta, percentage: p };
	}

	if (percentage < roundedDiff) {
		const response = await fetch(
			`${process.env.DATABASE_URL}/twitterKeys.json`
		);
		const { refreshToken } = await response.json();

		const twitterClient = new TwitterApi({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		});

		const {
			client: refreshedClient,
			accessToken,
			refreshToken: newRefreshToken,
		} = await twitterClient.refreshOAuth2Token(refreshToken);

		const putResponse = await fetch(
			`${process.env.DATABASE_URL}/twitterKeys.json`,
			{
				method: "put",
				body: JSON.stringify({
					accessToken,
					refreshToken: newRefreshToken,
				}),
				headers: { "Content-Type": "application/json" },
			}
		);
		await putResponse.json();

		const bars = make_bar(roundedDiff, "░▒▓█", 18, 18);

		await refreshedClient.v2.tweet(`${bars.str} ${bars.percentage * 100}%`);

		await fetch(`${process.env.DATABASE_URL}/lastTweet.json`, {
			method: "put",
			body: JSON.stringify({
				...bars,
				percentage: bars.percentage * 100,
				presisePercentage:
					((now.getTime() -
						new NepaliDate(currentYear, 0, 0).getTime()) *
						100) /
					(new NepaliDate(currentYear + 1, 0, 0).getTime() -
						new NepaliDate(currentYear, 0, 0).getTime()),
			}),
			headers: { "Content-Type": "application/json" },
		});

		return {
			statusCode: 200,
			body: `${bars.str} ${bars.percentage * 100}%`,
		};
	}
};

module.exports.handler = schedule("@daily", handler);
