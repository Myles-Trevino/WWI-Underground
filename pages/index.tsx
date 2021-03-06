/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect} from 'react';
import Head from 'next/head';

import StateContext from '../common/state/state-context';
import Constants from '../common/constants';
import * as Helpers from '../common/helpers';
import Styles from './index.module.scss';
import Panorama from '../components/tour/panorama/panorama';


export default function Index(): JSX.Element {

	const state = useContext(StateContext);


	// Initializer.
	useEffect(() => { Helpers.loadDefaultWwiu(state); }, []);


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>{Constants.websiteName}</title>
		</Head>

		{/* Panorama. */}
		<Panorama demoMode={true}/>

		{/* Introduction. */}
		<div className={Styles.content}>

			<div className={Styles.section}>
				<h1>{Constants.websiteName}</h1>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

		</div>

	</>);
}
