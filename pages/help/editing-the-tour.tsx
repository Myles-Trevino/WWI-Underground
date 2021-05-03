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
			<title>Editing a Custom Tour - Help - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">
			<div className="gridTile">

				<h2 className="tileSection">Editing a Custom Tour</h2>
				<div className="solidDivider"></div>

				{/* Overview. */}
				<div className="gridTileSection">
					<h3>Overview</h3>

					<p>
						This website supports creating custom tours, so anyone can add information to the cave tour and share it with others. Check out the &quot;Creating, Saving, and Loading a Custom tour&quot; help document for more information.
					</p>
				</div>

				<div className="dashedDivider"></div>

				{/* Adding Your Own Information. */}
				<div className="gridTileSection">
					<h3>Adding Your Own Information</h3>

					<p>
						When viewing the tour, at the center of your view is a yellow dot. Think of this dot as your pointer. When adding new information to the Tour, this pointer is where that new information will go. When Edit Mode is enabled, 3 options will be available to you. We&apos;ll go over them in order below.<br/><br/>

						<u>Set Default Rotation</u>: When you load this particular panorama, where do you want to be looking first? To change this, set your view how you want it, and press this button.<br/><br/>

						<u>Add Information</u>: This will create a new information node at your pointer&apos;s location. Click on the new node to change its name and add a description.For example, to annotate a drawing on the cave walls, you would use this button.<br/><br/>

						<u>Add Navigation</u>: This button allows you to create a link to another panorama file, like the buttons you click to view different cave panoramas on the Tour.
					</p>

					<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ACWIg-aGwD8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>
			</div>
		</div>
	</>);
}
