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
			<div className="articleSection">

				<h2>Saving and Loading a Custom Tour</h2>

				{/* Saving. */}
				<h3>Saving</h3>

				<p>
					When making edits to the cave panoramas, you can save your changes by downloading a file. This file contains all annotations and other settings you may have changed. To save a custom cave tour, click the save button. Then, save the file in a safe location you can easily get back to. The file extension is .wwiu, however it is a simple text file and will not harm your computer.
				</p>


				{/* Loading. */}
				<h3>Loading</h3>

				<p>To load a custom cave tour, press the load button. Select the .wwiu file from your computer. Then, all your settings and custom annotations will be loaded into the cave viewer.
				</p>
				<video width="720" height="480" controls>
					<source src="../videos/saving-and-loading.webm" type="video/webm"/>
				</video>
			</div>
		</div>
	</>);
}
