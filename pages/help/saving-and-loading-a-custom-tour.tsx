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

				<h2 className="tileSection">Saving and Loading a Custom Tour</h2>
				<div className="solidDivider"></div>

				{/* Saving. */}
				<div className="gridTileSection">
					<h3>Saving</h3>

					<p>
						When making edits to the cave panoramas, you can save your changes by downloading a file. This file contains all annotations and other settings you may have changed. To save a custom cave tour, click the save button. Then, save the file in a safe location you can easily get back to. The file extension is .wwiu, however it is a simple text file and will not harm your computer.
					</p>
				</div>

				<div className="dashedDivider"></div>

				{/* Loading. */}
				<div className="gridTileSection">
					<h3>Loading</h3>

					<p>To load a custom cave tour, press the load button. Select the .wwiu file from your computer. Then, all your settings and custom annotations will be loaded into the cave viewer.
					</p>
					<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/L_6gniUxIt8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>			</div>
			</div>
		</div>
	</>);
}
