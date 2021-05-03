/*
	Copyright Myles Trevino and Jackson Reed
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';

import Constants from '../common/constants';


export default function Index(): JSX.Element {

	return (<>

		{/* Head. */}
		<Head>
			<title>About - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">

			{/* The Project. */}
			<div className="gridTile">

				<h2 className="tileSection">The Project</h2>
				<div className="solidDivider"></div>

				<p className="tileSection">
					This website is part of a multi-year project to develop a digital resource repository to encourage and support the continued preservation, documentation, and exhibition of imperiled cultural heritage sites located in stone quarries in France, including wall-etchings left behind by World War I American Expeditionary Force soldiers. Our particular focus is on the 26th &quot;Yankee&quot; Division.<br/><br/>

					By capturing a &apos;digital footprint&apos; of the 100-year-old quarries, this work addresses the pressing need to preserve these imperiled artifacts. Additionally, we strive to create a rich repository of contextual information, such as articles on each of the men who left their name behind. The goal of this project is to remember the men who served and to support innovation, research, and teaching on these subjects.
				</p>
			</div>

			{/* The Team. */}
			<div className="gridTile">

				<h2 className="tileSection">The Team</h2>
				<div className="solidDivider"></div>

				<h3 className="tileSection">Research and Cave Photography</h3>

				<p className="tileSection">
					<a href="http://cs.wheatoncollege.edu/mleblanc/" target="_blank">Mark LeBlanc</a><br/>
					Professor of Computer Science, Wheaton College, Norton, MA<br/><br/>

					<a href="https://www.antioch.edu/faculty/heather-warfield/" target="_blank">Heather Warfield</a><br/>
					Associate Professor, Department of Applied Psychology, Antioch University New England, Keene, NH<br/><br/>

					<a href="https://vimeo.com/keithheyward" target="_blank">Keith Heyward</a><br/>
					Cinematographer/Media Specialist, Providence, RI<br/><br/>

					<a href="https://wheatoncollege.edu/academics/library/about-the-library/library-staff/kate-boylan/" target="_blank">Kate Boylan</a><br/>
					Director of Archives and Digital Initiatives, Wheaton College, Norton, MA<br/><br/>


					<a href="http://www.kellygoff.net/" target="_blank">Kelly Goff</a><br/>
					Associate Professor of Sculpture, Wheaton College, Norton, MA<br/>
					Co-Chair, Department of Visual Art and the History of Art<br/><br/>

					<a href="https://en.wikipedia.org/wiki/Chemin_des_Dames" target="_blank">Gilles Chauwin</a><br/>
					<span className="credit">Executor of Chemin des Dames Association</span>
				</p>
				<div className="dashedDivider"></div>

				<h3 className="tileSection">Website Development</h3>

				<p className="tileSection">
					<a href="https://laventh.com/" target="_blank">Myles Trevino</a><br/><br/>
					Chris Dunphy<br/><br/>
					Jackson Reed
				</p>
			</div>

			{/* In the Caves. */}
			<div className="gridTile">

				<h2 className="tileSection">In the Caves</h2>
				<div className="solidDivider"></div>

				<div className="gridTileSection">
					<img src="images/about/cave-team.jpg" width="100%" alt="Gilles Chauwin, Kelly Goff, Keith Heyward, and Mark LeBlanc, setting up equipment in the cave."/>

					<p>
						In August of 2019, a team from Wheaton College in Norton, Massachusetts undertook a two-day expedition into the caves at Braye-en-Laonnois, France to capture the panorama images that comprise the tour on this site along with 3D LIDAR laser scans.

						<br/><br/>

						Artifacts in both quarries have suffered from vandalism and theft, as well as natural environmental effects such as cave-ins and water damage. These sites face an uncertain and, potentially, imperiled future. Without efforts to document the carvings and writings of these Americans, their messages - sometimes the last message from a soldier - may be lost forever. Securing a 3D footprint is one immediate act to address the caves&apos; vulnerability.
					</p>
				</div>

			</div>


			{/* The 26th Yankee Division. */}
			<div className="gridTile">

				<h2 className="tileSection">The 26th Yankee Division</h2>
				<div className="solidDivider"></div>

				<div className="gridTileSection">
					<img src="images/about/from-maine-to-france.jpg" width="35%" alt="Book cover with a photo of a seated soldier and the text: From Maine to France and Somehow Back Again. World War I Experiences of John M. Longley and the 26th Yankee Division. Mark D. LeBlanc and John M. LeBlanc."/>

					<p>
						This project follows over a decade of research by Mark LeBlanc (documented in his book <a href="https://www.lulu.com/en/us/shop/john-m-leblanc-and-mark-d-leblanc/from-maine-to-france-and-somehow-back-again-world-war-i-experiences-of-john-m-longley-and-the-26th-yankee-division/paperback/product-1p7jqek9.html" target="_blank">From Maine to France</a>) and more recently the vision of pilgrimage scholar, Heather Warfield.

						<br/><br/>

						The Picardy region of France is peppered with abandoned quarries, many dating to the Middle Ages and mined for stone used in the construction of dwellings from cottages to cathedrals. Some of these caverns are miles in length. During World War I, the caves were occupied by U.S. National Guard soldiers from New England - from the American Expeditionary Force (AEF) 26th &quot;Yankee&quot; Division.<br/><br/>

						The 26th Division was organized in 1917 and deployed to France where they fought until the end of the war. It consisted of volunteers from Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont; the division&apos;s proudly self-assigned nickname reflects the geographic origin of the soldiers.
					</p>
				</div>

			</div>


			{/* Press. */}
			<div className="gridTile">

				<h2 className="tileSection">Press</h2>
				<div className="solidDivider"></div>

				<div className="gridTileSection">
					<img src="images/about/ww1-commission-logo.png" width="50%" alt="Logo of the the United States WWI Centennial Commission."/>

					<p>
						<a href="https://www.worldwar1centennial.org/index.php/communicate/press-media/wwi-centennial-news/6555-project-demonstrates-3d-collection-of-cave-messages-in-france-left-by-american-soldiers-in-wwi.html" target="_blank">United States WWI Centennial Commission</a> - &quot;Project Demonstrates 3D Collection of Cave Messages in France Left by American Soldiers in WWI&quot;<br/><br/>

						<a href="https://wheatoncollege.blog/academics/computer-science/100-years-pass-like-a-dream/" target="_blank">Wheaton College</a> - &quot;100 years Pass Like a Dream&quot;
					</p>
				</div>

			</div>

		</div>

	</>);
}
