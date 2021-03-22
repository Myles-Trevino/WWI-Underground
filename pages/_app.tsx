/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import type {AppProps} from 'next/app';
import App from 'next/app';

import Navbar from '../components/common/navbar/navbar';
import Message from '../components/common/message/message';

import '../common/styles/variables.scss';
import '../common/styles/text.scss';
import '../common/styles/general.scss';
import Themes from '../common/styles/themes.module.scss';
import React from 'react';

export class MyApp extends App{
	public constructor(props: AppProps){
		super(props);
		this.state = {
			theme: null
		};
	}

	public componentDidMount(): void{
		this.setState({
			theme: window.localStorage.getItem('theme'),
			cursorColor: window.localStorage.getItem('cursorColor')
		});
		console.log(this.state.theme);
	}

	public render(): JSX.Element{
		const {Component, pageProps} = this.props;
		if(this.state.theme === 'light'){
			return <div className={Themes.light}>

				{/* Head. */}
				<Head>
					<link rel="icon" type="image/x-icon" href="favicon.png"/>
				</Head>
				{/* Navbar. */}
				<Navbar/>

				{/* Page. */}

				<Component {...pageProps}/>

				{/* Message. */}
				<Message/>


			</div>;
		}
		return <div className={Themes.dark}>

			{/* Head. */}
			<Head>
				<link rel="icon" type="image/x-icon" href="favicon.png"/>
			</Head>

			{/* Navbar. */}
			<Navbar/>

			{/* Page. */}

			<Component {...pageProps}/>

			{/* Message. */}
			<Message/>


		</div>;
	}
}
export default MyApp;
