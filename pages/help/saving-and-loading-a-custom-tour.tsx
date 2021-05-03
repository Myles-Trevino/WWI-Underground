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
		<Head>
			<title>Saving and Loading a Custom Tour - Help - {Constants.websiteName}</title>
		</Head>

		<div className="articleContainer">
			<div className="gridTile">

				<h2 className="tileSection">Creating, Saving, and Loading a Custom Tour</h2>
				<div className="solidDivider"></div>

				<div className="gridTileSection">
					<h3>Creating</h3>

					<p>To create a custom tour, open your &quot;Account&quot; page. In the &quot;Tours&quot; section, give it a name and click &quot;Create&quot;. Then, click on the new custom tour to load it. Your custom tour will have all the nodes in the default tour, but you can edit yours however you like.</p>
				</div>

				<div className="dashedDivider"></div>

				{/* Saving. */}
				<div className="gridTileSection">
					<h3>Saving</h3>

					<p>
                        To save your edits to a custom tour, first make sure you&apos;re logged in to your account. If you don&apos;t have one, go to the &quot;Account&quot; page and create one.<br/><br/>
                        Additionally, make sure you&apos;re not in the default cave tour, as that is protected from edits. You must be in a custom tour, accessed from your &quot;Account&quot; page. <br/><br/>
						If any nodes you have created are empty, you will not be able to save your edits. The error message will tell you which nodes are empty, so make sure to either delete or fill them out.
					</p>
				</div>

				<div className="dashedDivider"></div>

				{/* Loading. */}
				<div className="gridTileSection">
					<h3>Loading</h3>

					<p>To load a custom cave tour, open your &quot;Account&quot; page. Then, simply click on the name of the custom tour you wish to open in the &quot;Tours&quot; section.
					</p>

					<iframe className="tileSection" src="https://www.youtube-nocookie.com/embed/L_6gniUxIt8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>			</div>
			</div>
		</div>
	</>);
}
