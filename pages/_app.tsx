/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import type {AppProps} from 'next/app';

import Message from '../components/common/message/message';

import '../common/styles/variables.scss';
import '../common/styles/text.scss';
import '../common/styles/general.scss';


export default function App({Component, pageProps}: AppProps): JSX.Element {
	return <>

		<Head>
			<link rel="icon" type="image/x-icon" href="favicon.png"/>
		</Head>

		{/* Page. */}
		<Component {...pageProps}/>

		{/* Message. */}
		<Message/>
	</>;
}
