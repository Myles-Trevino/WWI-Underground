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
			<title>Saving Help</title>
		</Head>
		<Navbar></Navbar>
		<br/><br/>
		<div className = {Style.helpDocHeading}>
			<h1>Saving a custom cave tour:</h1>
			<br/>
			<div className = {Style.helpDocText}>
				<p>When making edits to the cave panoramas, you can save your changes by downloading a file. This file contains all annotations and other settings you may have changed.
					To save a custom cave tour, click the <span className = {Style.svgContainer}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<polygon className="svg-stroke-glyph" points="6 6 6 26 26 26 26 11 21 6 6 6"/>
						<polyline className="svg-stroke-glyph" points="21 6 21 12 12 12 12 6"/>
						<circle className="svg-stroke-glyph" cx="16" cy="19" r="3"/>
					</svg>
				</span> button. Then, save the file in a safe location you can easily get back to. The file extension is .wwiu, however it is a simple text file and will not harm your computer.
				</p>
			</div>
		</div>
		<div className = {Style.helpDocHeading}>
			<h1>Loading a custom cave tour:</h1>
			<div className = {Style.helpDocText}>
				<p>To load a custom cave tour, press the <span className = {Style.svgContainer}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<line className="svg-stroke-glyph" x1="16" y1="28" x2="16" y2="10.59"/>
						<path className="svg-stroke-glyph" d="M11,14.59l4.3-4.3a1,1,0,0,1,1.4,0l4.3,4.3"/>
						<path className="svg-stroke-glyph" d="M12,18H6.44S4,16.88,4,14.68A3.88,3.88,0,0,1,7,11,4.37,4.37,0,0,1,8,8a4,4,0,0,1,4-1s1-3,5-3c6,0,6,5,6,5s5,0,5,5c0,4-5,4-5,4H20"/>
					</svg>
				</span> button. Select the .wwiu file from your computer. Then, all your settings and custom annotations will be loaded into the cave viewer.
				</p>
			</div>
		</div>
	</>);
}
