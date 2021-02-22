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
			<title>Test Doc</title>
		</Head>
		<Navbar></Navbar>
		<br/><br/>
		<div className = {Style.helpDocHeading}>
			<h1>Editing the cave tour:</h1>
			<div className = {Style.helpDocText}>
				<p>The cave tour supports user-submitted edits to add new information and points of interest.
					To enable editing mode, simply click on the <span className = {Style.svgContainer}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<path className="svg-stroke-glyph" d="M24,5l3,3L10,25l-2.79.7a.75.75,0,0,1-.91-.91L7,22Z"/>
					<line className="svg-stroke-glyph" x1="21.5" y1="7.5" x2="24.5" y2="10.5"/>
				</svg></span> button. Then, look to the &quot;Adding your own information&quot; section below. To return to viewing mode, click on the <span className = {Style.svgContainer}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path className="svg-stroke-glyph" d="M4,16s5-6,12-6,12,6,12,6-5,6-12,6S4,16,4,16Z"/>
						<circle className="svg-stroke-glyph" cx="16" cy="16" r="2.5"/>
					</svg>
				</span> button that has replaced the Edit button.
				</p>
			</div>
		</div>
		<div className = {Style.helpDocHeading}>
			<h1>Adding your own information:</h1>
			<div className = {Style.helpDocText}>
				<p>When viewing the tour, at the center of your view is a yellow dot. Think of this dot as your pointer. When adding new information to the Tour, this pointer is where that new information will go.</p>
				<br/>
				<p>When Edit Mode is enabled, 3 options will be available to you. Let&apos;s go over them in order below.</p>
				<br/>
				<p>Set Default Rotation: When you load this particular panorama, where do you want to be looking first? To change this, set your view how you want it, and press this button.</p>
				<br/>
				<p>Add Information: This will create a new information node at your pointer&apos;s location. Click on the new node to change its name and add a description.
					For example, to annotate a drawing on the cave walls, you would use this button.
				</p>
				<br/>
				<p>Add Navigation: This button allows you to create a link to another panorama file, like the buttons you click to view different cave panoramas on the Tour.</p>
			</div>
		</div>
	</>);
}
