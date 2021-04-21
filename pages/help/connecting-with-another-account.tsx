/*
	Copyright Chris Dunphy and Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Constants from '../../common/constants';


export default function Help(): JSX.Element {

	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Connecting With Another Account - Help - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">
			<div className="gridTile">

				<h2 className="tileSection">Connecting With Another Account</h2>
				<div className="solidDivider"></div>

				<p className="tileSection">
					By connecting with another account, you can view all their custom tours. These may include edits to the default cave tour, or even entirely new nodes of information. <br/><br/>
                    If you want to add a connection to Person B, first visit the &quot;Account&quot; page on the top bar. Then, simply enter Person B&apos;s email they used to sign up for their account on this website in the &quot;Connections&quot; box, and click add. <br/><br/>
                    Custom tours can be shared with other people even if they don&apos;t have an account here. When viewing your custom tour, you can copy the link in your browser window and share it with others, and they will see your custom tour using that link!
					<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/I2XR_sOgGSE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</p>

			</div>
		</div>
	</>);
}
