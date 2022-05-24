import React, { useState, useEffect } from "react";
import { Center, Container, Heading, Box, Text, Link } from "@chakra-ui/react";
import ProgressBar from "@components/ProgressBar";
import NepaliDate from "nepali-date/cjs/NepaliDate";
import FullPageLoadingSpinner from "@components/FullPageLoadingSpinner";

const Home = () => {
	const now = new NepaliDate(new Date(Date.now()));
	const currentYear = +now.format("YYYY");
	const currentMonth = +now.format("M");

	const [hours, setHours] = useState(now.getHours());
	const [minutes, setMinutes] = useState(now.getMinutes());
	const [seconds, setSeconds] = useState(now.getSeconds());
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const interval = setInterval(() => {
			setSeconds(new NepaliDate(new Date(Date.now())).getSeconds());
			setMinutes(new NepaliDate(new Date(Date.now())).getMinutes());
			setHours(new NepaliDate(new Date(Date.now())).getHours());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	if (!isClient) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<Center
			h="100vh"
			backgroundImage={`url("https://images.unsplash.com/photo-1589800463007-3be49fe18b92?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700")`}
		>
			<Container maxW="md" shadow="md" rounded="md" bg="white">
				<Box>
					<Center>
						<Heading
							m={6}
							my={10}
							fontSize={"4xl"}
							fontFamily="Inter"
						>
							Nepali Year Progress
						</Heading>
					</Center>

					<Text align="center" fontSize={"xl"}>
						{new NepaliDate(new Date(Date.now())).format(
							"DDD MMM D, YYYY"
						)}{" "}
						(
						{new NepaliDate(new Date(Date.now())).format(
							"ddd mmmm d, yyyy"
						)}
						)
					</Text>

					<Text align="center" fontSize={"3xl"}>
						{hours.toLocaleString("en-US", {
							minimumIntegerDigits: 2,
							useGrouping: false,
						})}
						:
						{minutes.toLocaleString("en-US", {
							minimumIntegerDigits: 2,
							useGrouping: false,
						})}
						:
						{seconds.toLocaleString("en-US", {
							minimumIntegerDigits: 2,
							useGrouping: false,
						})}
					</Text>
					<ProgressBar
						title="Year Progress"
						percent={
							((now.getTime() -
								new NepaliDate(currentYear, 0, 0).getTime()) /
								(
									new NepaliDate(
										currentYear + 1,
										0,
										0
									).getTime() -
									new NepaliDate(currentYear, 0, 0).getTime()
								).toFixed(2)) *
							100
						}
					/>
					<ProgressBar
						title="Month Progress"
						percent={
							((now.getTime() -
								new NepaliDate(
									currentYear,
									currentMonth - 1,
									0
								).getTime()) /
								(
									new NepaliDate(
										currentYear,
										currentMonth,
										0
									).getTime() -
									new NepaliDate(
										currentYear,
										currentMonth - 1,
										0
									).getTime()
								).toFixed(2)) *
							100
						}
					/>
					<ProgressBar
						title="Day Progress"
						percent={
							parseFloat(
								(hours * 3600 + minutes * 60 + seconds) / 86400
							).toFixed(4) * 100
						}
					/>
					{/* <ProgressBar title="Office Time Progress" percent={20} /> */}

					<Box m={5} my={10} fontSize={13}>
						<Text align="center">
							Leave this open or follow{" "}
							<Link
								href="https://twitter.com/np_yearprogress"
								color="blue.500"
							>
								@np_yearprogress
							</Link>{" "}
							to stay up to date.
						</Text>
						<Text align="center">
							Made by{" "}
							<Link
								href="https://www.sahrohit.com.np"
								color="blue.500"
							>
								Rohit Sah.
							</Link>{" "}
							Inspired by @year_progress.
						</Text>
					</Box>
				</Box>
			</Container>
		</Center>
	);
};

export default Home;
