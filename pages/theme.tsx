/*
	Copyright Chris Dunphy
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {RgbStringColorPicker} from 'react-colorful';
import Head from 'next/head';
import Constants from '../common/constants';
import {useState} from 'react';
import Cookies from 'js-cookie';
function setCrosshairColorCookie(color: string): void{
	Cookies.set('cursorColor', color, {path: '/', expires: 999, sameSite: 'strict'});
}

export default function Theme(): JSX.Element {
	const [color, setColor] = useState('#ffffff');
	setCrosshairColorCookie(color);

	// Note: this does not save between refreshes. Will do that next, perhaps with a cookie.

	return (<>

		{/* Head. */}
		<Head>
			<title>Theme - {Constants.websiteName}</title>
		</Head>
		{/* Content. */}
		<h1>Cursor theme:</h1>
		<div className = "colorPicker">
			<RgbStringColorPicker color={color} onChange={setColor}/>;
		</div>
	</>);
}
