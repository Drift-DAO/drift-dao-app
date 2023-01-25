import type { AppProps } from "next/app";
import '../styles/globals.css';
import 'simplebar-react/dist/simplebar.min.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import store from '../redux/store';
import { Provider } from 'react-redux';

const { chains, provider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);
const { connectors } = getDefaultWallets({
	appName: 'Drift-DAO',
	chains,
});
const wagmiClient = createClient({
	autoConnect: false,
	connectors,
	provider,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider
					chains={chains}
					theme={darkTheme({
						accentColor: '#4e25b8',
						accentColorForeground: 'white',
						borderRadius: 'large',
						fontStack: 'rounded',
						overlayBlur: 'large',
					})}
				>
					<Head>
						<title>App - Drift DAO</title>
						<meta charSet="UTF-8" />
						<meta
							name="description"
							content="A unified platform for all your DAOs."
						/>
						<meta
							name="description"
							content="A platform for the next generation to manage all your DAOs."
						/>
					</Head>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</Provider>
	);
}
