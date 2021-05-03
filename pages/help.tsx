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
			<div className="gridTile">

				<h2 className="tileSection">Help</h2>
				<div className="solidDivider"></div>

				{/* First Steps. */}
				<div className="gridTileSection">
					<h3>First Steps</h3>
					<p>
						<Link href="help/exploring-the-tour"><a>Exploring the Tour</a></Link><br/>
						<Link href="help/creating-an-account"><a>Creating an Account</a></Link>
					</p>
				</div>

				<div className="dashedDivider"></div>

				{/* Editing and Collaboration. */}
				<div className="gridTileSection">
					<h3>Editing and Collaboration</h3>
					<p>
						<Link href="help/editing-the-tour"><a>Editing a Custom Tour</a></Link><br/>
						<Link href="help/saving-and-loading-a-custom-tour"><a>Creating, Saving, and Loading a Custom Tour</a></Link><br/>
						<Link href="help/connecting-with-another-account"><a>Connecting With Another Account</a></Link>
					</p>
				</div>

			</div>
		</div>

	</>);
}
