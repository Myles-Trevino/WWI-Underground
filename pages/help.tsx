/*
	Copyright Chris Dunphy and Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Link from 'next/link';
import Constants from '../common/constants';


export default function Help(): JSX.Element {

	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Help - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">
			<div className="articleSection">

				<h2>Help</h2>

				{/* First Steps. */}
				<h3>First Steps</h3>
				<p>
					<Link href="help/exploring-the-tour"><a>Exploring the Tour</a></Link><br/>
					<Link href="help/creating-an-account"><a>Creating an Account</a></Link>
				</p>

				{/* Editing and Collaboration. */}
				<h3>Editing and Collaboration</h3>
				<p>
					<Link href="help/editing-the-tour"><a>Editing the Tour</a></Link><br/>
					<Link href = "help/saving-and-loading-a-custom-tour"><a>Saving and Loading a Custom Tour</a></Link>
				</p>

			</div>
		</div>

	</>);
}
