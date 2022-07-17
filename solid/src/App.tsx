import { Component, createSignal } from "solid-js";
import NepaliDate from "nepali-date/cjs/NepaliDate";
import ProgressBar from "./components/ProgressBar";

const App: Component = () => {
	const getCurrentNepaliDate = () => {
		return new NepaliDate(
			new Date(
				new Date(Date.now()).getTime() +
					new Date(Date.now()).getTimezoneOffset() * 60000 +
					3600000 * Number("+5.75")
			)
		);
	};

	const convertToLocaleString = (value: number) => {
		return value.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});
	};

	const currentYear = +getCurrentNepaliDate().format("YYYY");
	const currentMonth = +getCurrentNepaliDate().format("M");
	const [hours, setHours] = createSignal<number>(
		getCurrentNepaliDate().getHours()
	);
	const [minutes, setMinutes] = createSignal<number>(
		getCurrentNepaliDate().getMinutes()
	);
	const [seconds, setSeconds] = createSignal<number>(
		getCurrentNepaliDate().getSeconds()
	);

	setInterval(() => {
		setSeconds(getCurrentNepaliDate().getSeconds());
		setMinutes(getCurrentNepaliDate().getMinutes());
		setHours(getCurrentNepaliDate().getHours());
	}, 1000);

	return (
		<div
			class={`bg-[url('https://images.unsplash.com/photo-1589800463007-3be49fe18b92?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700')] grid place-content-center h-screen w-full`}
		>
			<div class="bg-white m-8 p-8 flex flex-col space-y-12 rounded-md">
				<h1 class="text-4xl font-semibold text-center">
					Nepali Year Progress
				</h1>
				<div class="text-center">
					<div class="flex flex-col md:flex-row md:space-x-2">
						<p class="text-xl">
							{getCurrentNepaliDate().format("DDD MMMM D, YYYY")}
						</p>
						<p class="text-xl">
							({getCurrentNepaliDate().format("ddd mmmm d, yyyy")}
							)
						</p>
					</div>
					<span class="countdown text-4xl">
						<span
							style={{
								"--value": convertToLocaleString(hours()),
							}}
						/>
						:
						<span
							style={{
								"--value": convertToLocaleString(minutes()),
							}}
						/>
						:
						<span
							style={{
								"--value": convertToLocaleString(seconds()),
							}}
						/>
					</span>
				</div>

				{/* <div class="flex flex-col space-y-3"> */}
				<ProgressBar
					title={`Year Progress (${getCurrentNepaliDate().format(
						"yyyy"
					)})`}
					color="emerald"
					value={
						((getCurrentNepaliDate().getTime() -
							new NepaliDate(currentYear, 0, 0).getTime()) /
							(new NepaliDate(currentYear + 1, 0, 0).getTime() -
								new NepaliDate(currentYear, 0, 0).getTime())) *
						100
					}
				/>
				<ProgressBar
					color="emerald"
					title={`Month Progress (${getCurrentNepaliDate().format(
						"mmmm"
					)})`}
					value={
						((getCurrentNepaliDate().getTime() -
							new NepaliDate(
								currentYear,
								currentMonth - 1,
								0
							).getTime()) /
							(new NepaliDate(
								currentYear,
								currentMonth,
								0
							).getTime() -
								new NepaliDate(
									currentYear,
									currentMonth - 1,
									0
								).getTime())) *
						100
					}
				/>
				<ProgressBar
					color="emerald"
					title={`Day Progress (${getCurrentNepaliDate().format(
						"dd"
					)} गते,  ${getCurrentNepaliDate().format("dddd")})`}
					value={
						((hours() * 3600 + minutes() * 60 + seconds()) /
							86400) *
						100
					}
				/>
				<div class="m-5 my-10 text-xs">
					<p class="text-center">
						Leave this open or follow{" "}
						<a
							href="https://twitter.com/np_yearprogress"
							class="text-blue-500"
						>
							@np_yearprogress
						</a>{" "}
						to stay up to date.
					</p>
					<p class="text-center">
						Made by{" "}
						<a
							href="https://www.sahrohit.com.np"
							class="text-blue-500"
						>
							Rohit Sah.
						</a>{" "}
						Inspired by @year_progress.
					</p>
				</div>
			</div>
		</div>
	);
};

export default App;
