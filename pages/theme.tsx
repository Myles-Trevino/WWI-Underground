/*
	Copyright Chris Dunphy
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {HexColorPicker} from 'react-colorful';
import Head from 'next/head';
import Constants from '../common/constants';
import {useState} from 'react';


export default function Theme(): JSX.Element {
	// Render.
	const [color, setColor] = useState('#ffffff');
	document.documentElement.style.setProperty('--accent-color', color);

	// Note: this does not save between refreshes. Will do that next, perhaps with a cookie.

	return (<>

		{/* Head. */}
		<Head>
			<title>Theme - {Constants.websiteName}</title>
		</Head>
		{/* Content. */}
		<h1>Cursor theme:</h1>
		<div className = "colorPicker">
			<HexColorPicker color={color} onChange={setColor}/>;
		</div>
	</>);
}
