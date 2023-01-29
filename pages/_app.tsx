import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";

const options = {
	fetcher: (url: string) => fetch(url).then((response) => response.json()),
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={options}>
			<div className="w-full max-w-xl mx-auto">
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}

export default MyApp;
