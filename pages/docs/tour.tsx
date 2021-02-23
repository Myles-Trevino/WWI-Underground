/**
 * Copyright Chris Dunphy
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import Navbar from '../../components/common/navbar/navbar';
import Head from 'next/head';
import Style from './docs.module.scss';


export default function Help(): JSX.Element {
	return (<>
		<Head>
			<title>Cave Tour - Help</title>
		</Head>
		<Navbar></Navbar>
		<br/><br/>
		<div className = {Style.helpDocHeading}>
			<h1>How to explore:</h1>
			<div className = {Style.helpDocText}>
				<p>First, load the Tour by clicking the &quot;Tour&quot; button on the navbar above.</p>
				<br/>
				<p>Next, use your mouse or finger to pan the image 360 degrees. You can also zoom into the image with your scroll wheel, if you&apos;re on a PC or Mac. </p>
				<br/>
				<p>Lastly, the full model of the cave is put together with multiple panoramic images. To go through other parts of the cave, click on the &quot;Panorama X&quot;, where X is a number, overlay as you explore.
					You will then be brought to the next location in the cave.
				</p>
				<br/>
				<p>Alternatively, you can open a map of the cave and jump to any panorama you want. Click the <span className = {Style.svgContainer}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="2rem">
						<polygon className="svg-stroke-glyph" points="6 9 6 25 11 23 16 25 21 23 26 25 26 9 21 7 16 9 11 7 6 9"/>
						<line className="svg-stroke-glyph" x1="11" y1="7" x2="11" y2="23"/>
						<line className="svg-stroke-glyph" x1="16" y1="9" x2="16" y2="25"/>
						<line className="svg-stroke-glyph" x1="21" y1="7" x2="21" y2="23"/>
					</svg>
				</span> button on the Tour&apos;s page. The map will pop up in the lower left corner of your page.</p>
				<p>The yellow cone on the map is your current viewpoint. As you pan around the cave, you will see your viewpoint change on the map. Each white dot on the map represents another panoramic image of the cave. Simply
					click on the white dot to travel there.
				</p>
			</div>
		</div>
		<div className = {Style.helpDocHeading}>
			<h1>Further exploration:</h1>
			<div className = {Style.helpDocText}>
				<p>During your virtual visit, you will encounter black boxes of text overlaid on the images. These are notes left by others, to give greater context to the historical artifacts within the cave.</p>
				<p>Eventually, these will be editable by anyone with an account, much like Wikipedia.</p>
			</div>
		</div>
	</>);
}
