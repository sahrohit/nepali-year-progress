import { Html, Head, Main, NextScript } from "next/document";
import OpenGraphHead from "@components/OpenGraphHead";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<OpenGraphHead />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
