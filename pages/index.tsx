/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/

import {useContext, useEffect} from 'react';
import Head from 'next/head';
import {observer} from 'mobx-react-lite';

import StateContext from '../common/state/state-context';
import Constants from '../common/constants';
import Styles from './index.module.scss';
import Panorama from '../components/tour/panorama/panorama';


export default observer(function Index(): JSX.Element {

	const state = useContext(StateContext);


	// Initializer.
	useEffect(() => { initialize(); }, []);

	async function initialize(): Promise<void> {
		state.tour.reset();
		state.tour.setTour(await state.app.getDefaultTour(state), Constants.defaultTourId);
	}


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>{Constants.websiteName}</title>
		</Head>

		{/* Panorama. */}
		{state.app.defaultTour && <Panorama demoMode={true}/>}

		{/* Introduction. */}
		<div className={Styles.content}>

			<div className={Styles.section}>
				<h1>{Constants.websiteName}</h1>

				<p>
					The WWI Underground project is a digital preservation of French caves where U.S. soldiers took refuge in during WWI.  The scope of the initiative is the American Expeditionary Force (AEF) 26th &quot;Yankee&quot; Division, comprised of soldiers from Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, and Vermont. Securing a 3D footprint addresses the cave’s vulnerability and is part of a multi-year plan to archive and build digital resources so others can leverage the data-rich models and imagery as we continue to remember the sacrifices made and preserve the messages left by these soldiers from New England.
				</p>
			</div>

		</div>

	</>);
});
