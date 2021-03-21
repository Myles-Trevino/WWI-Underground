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
			<title>Exploring the Tour - Help - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">
			<div className="gridTile">

				<h2 className="tileSection">Exploring the Tour</h2>
				<div className="solidDivider"></div>

				<p className="tileSection">
					Load the Tour by clicking the &quot;Tour&quot; button on the navbar above. Use your mouse or finger to move the panorama. You can also zoom into the panorama with your scroll wheel. The tour of the cave consists of multiple panorama images, each of a different location. To go to other parts of the cave, click on the &quot;Panorama&quot; tiles as you explore. You will then be brought to the corresponding location in the cave.<br/><br/>

					Alternatively, you can open a map of the cave and jump to any panorama you want. To open the map, click the map icon in the top left menu. The map will pop up in the lower left corner of your page. The yellow cone on the map is your current viewpoint. As you pan around the cave, you will see your viewpoint change on the map. Each dot on the map represents a location you can visit in the cave. Simply click on the dot to travel to the panorama.<br/><br/>

					During your virtual visit, you will encounter labels overlaid on the panoramas. You can click these labels to see their associated article. These notes give greater context to the historical artifacts within the cave.
				</p>

			</div>
		</div>
	</>);
}
