/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Link from 'next/link';

import Constants from '../common/constants';
import Styles from './index.module.scss';


export default function Index(): JSX.Element {

	return (<div className="centerer">
		<div className={Styles.content}>

			{/* Head. */}
			<Head>
				<title>{Constants.websiteName}</title>
			</Head>

			{/* Main. */}
			<div className="section">
				<h1>{Constants.websiteName}</h1>

				<p>The WWI Underground project is a digital preservation of French caves that U.S. soldiers took refuge in during WWI. During their stay, the soldiers wrote on and carved art into the limestone walls of these caves, providing us insight into their lives. Through this project, we hope to provide everyone access to explore these historical sites.</p>
			</div>

			{/* Online panoramas. */}
			<div className="section">
				<Link href="/panoramas"><a className="title">Online Panoramas</a></Link>

				<p>Explore the caves though a series of high-resolution images. Click on areas of the panorama to view contextual notes and jump between locations. You can even add your own notes and save them to share with others.</p>
			</div>

			{/* Desktop viewer. */}
			<div className="section">
				<a className="title" href={Constants.desktopViewerUrl}>Desktop Viewer</a>

				<p>Download the desktop application to explore a detailed 3D model of the cave and view the highest quality versions of the panoramas. This requires a Windows desktop or laptop capable of high-end 3D rendering.</p>
			</div>

		</div>
	</div>);
}
