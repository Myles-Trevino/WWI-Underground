/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import type {AppProps} from 'next/app';
import React, {useEffect, useContext} from 'react';
import StateContext from '../common/state/state-context';
import {observer} from 'mobx-react-lite';

import type * as Types from '../common/types';
import Navbar from '../components/common/navbar/navbar';
import Message from '../components/common/message/message';
import Themes from '../common/styles/themes.module.scss';

import '../common/styles/variables.scss';
import '../common/styles/text.scss';
import '../common/styles/general.scss';
import classNames from 'classnames';


export default observer(function App({Component, pageProps}: AppProps): JSX.Element {

	const state = useContext(StateContext);

	// Initializer.
	useEffect(() => {
		const cachedTheme = localStorage.getItem('theme');
		const cachedCrosshairColor = localStorage.getItem('crosshairColor');
		if(cachedTheme) state.app.setTheme(cachedTheme as Types.Theme);
		if(cachedCrosshairColor) state.app.setCrosshairColor(cachedCrosshairColor);
	}, []);


	return <div className={classNames('app', (state.app.theme === 'Light') ? Themes.light : Themes.dark)}>

		{/* Head. */}
		<Head>
			<link rel="icon" type="image/x-icon" href="favicon.png"/>
			<meta name="color-scheme" content="dark light"></meta>
		</Head>

		{/* Navbar. */}
		<Navbar/>

		{/* Page. */}
		<Component {...pageProps}/>

		{/* Message. */}
		<Message/>


	</div>;
});
