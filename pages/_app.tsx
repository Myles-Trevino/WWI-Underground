/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {AppProps} from 'next/app';

import '../common/styles/variables.scss';
import '../common/styles/text.scss';
import '../common/styles/general.scss';


export default function App({Component, pageProps}: AppProps): JSX.Element {
	return <Component {...pageProps} />;
}
