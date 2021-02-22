/*
	Copyright Myles Trevino, Jackon Reed
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect} from 'react';
import Head from 'next/head';

import StateContext from '../common/state/state-context';
import Constants from '../common/constants';
import * as Helpers from '../common/helpers';
import Styles from './about.module.scss';
import Navbar from '../components/common/navbar/navbar';

export default function Index(): JSX.Element {

	const state = useContext(StateContext);


	// One-time initialization.
	useEffect(() => { Helpers.loadDefaultWwiu(state); }, []);


	return (<>

		{/* Head. */}
		<Head>
			<title>{Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar></Navbar>

		{/* Content. */}
		<div className={Styles.content}>

			<div className={Styles.section}>
				<h1>{Constants.websiteName}</h1>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

			<div className={Styles.section}>
				<h2>The team</h2>
				<img src="images/about/_DSC2466.jpg" width="100%"/>
				<p>Click on this link to go to a cool website: <a>cool</a></p>
			</div>

			<div className={Styles.section}>
				<h2>Photographing the caves</h2>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

			<div className={Styles.section}>
				<h2>The 26th Yankee Division</h2>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

			<div className={Styles.section}>
				<h2>Press</h2>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

		</div>

	</>);
}
