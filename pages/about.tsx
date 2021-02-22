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

				<p>This online tour is part of a multi-year project to develop a digital resource repository to encourage and support the continued <b>preservation, documentation, and exhibition</b> of imperiled cultural heritage materials located in stone quarries in France; specifically, wall-etchings that record the experiences of the World War I American Expeditionary Force soldier.</p>
				<p>By capturing a “digital footprint” of these 100-year-old messages, this work addresses the pressing need to preserve these imperiled artifacts while producing a repository of data-rich sources that will support future innovation, research, and teaching.</p>
			</div>

			<div className={Styles.section}>
				<h2>The team</h2>
				<p>[todo]</p>
			</div>

			<div className={Styles.section}>
				<h2>Photographing the caves</h2>
				<img src="images/about/_DSC2466.jpg" width="100%"/>
				<p>[caption]</p>
				<p>In August of 2019, a team from Wheaton College in Norton, Massachusetts undertook a two-day expedition (totalling ~20 hours of work) into the caves at Braye-en-Laonnois, France to capture the panorama images that comprise the tour on this site along with 3D Lidar laser scans.</p>
				<p>The Picardy region of France is peppered with abandoned quarries, many dating to the Middle Ages and mined for stone used in the construction of dwellings from cottages to cathedrals. Some of these caverns are miles in length. During World War I, the caves were occupied by U.S. National Guard soldiers from New England—from the American Expeditionary Force (AEF) 26th “Yankee” Division.</p>
				<p>One of the three quarries is no longer accessible. The two remaining quarries are filled with carvings and writings made by American soldiers. Artifacts in both quarries have suffered from vandalism and theft, as well as natural environmental effects that have led to cave-ins and water damage to the sites. These sites face an uncertain and, potentially, imperiled future. Without efforts to document the carvings and writings of these Americans, their messages—sometimes the last
message from a soldier—may be lost forever. Securing a 3D footprint is one immediate act to address the caves&apos; vulnerability.</p>
			</div>

			<div className={Styles.section}>
				<h2>The 26th Yankee Division</h2>

				<p>[todo]</p>
			</div>

			<div className={Styles.section}>
				<h2>Press</h2>
				<img src="images/about/WW1_logo_v3_white.png" width="50%"/>
				<p><a href="https://www.worldwar1centennial.org/index.php/communicate/press-media/wwi-centennial-news/6555-project-demonstrates-3d-collection-of-cave-messages-in-france-left-by-american-soldiers-in-wwi.html">Project demonstrates 3D collection of cave messages in France left by American soldiers in WWI</a> from the United States WWI Centennial Commission</p>
				<p><a href="https://wheatoncollege.blog/academics/computer-science/100-years-pass-like-a-dream/">100 years pass like a dream</a> from Wheaton College</p>
			</div>

		</div>

	</>);
}
