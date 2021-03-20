/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import type {AppProps} from 'next/app';

import Navbar from '../components/common/navbar/navbar';
import Message from '../components/common/message/message';

import '../common/styles/variables.scss';
import '../common/styles/text.scss';
import '../common/styles/general.scss';


export default function App({Component, pageProps}: AppProps): JSX.Element {
	return <>

		{/* Head. */}
		<Head>
			<link rel="icon" type="image/x-icon" href="favicon.png"/>
			<meta name="color-scheme" content="dark"/>
		</Head>

		{/* Navbar. */}
		<Navbar/>

		{/* Page. */}
		<Component {...pageProps}/>

		{/* Message. */}
		<Message/>
	</>;
}
