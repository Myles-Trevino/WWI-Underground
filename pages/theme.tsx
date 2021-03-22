/*
	Copyright Chris Dunphy
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {RgbStringColorPicker} from 'react-colorful';
import Head from 'next/head';
import Constants from '../common/constants';
import Cookies from 'js-cookie';
import React, {useState} from 'react';


function setCrosshairColorCookie(color: string): void{
	Cookies.set('cursorColor', color, {path: '/', expires: 999, sameSite: 'strict'});
}

function setDarkTheme(): void{
	Cookies.set('theme', 'dark', {path: '/', expires: 999, sameSite: 'strict'});
	console.log('set dark');
}

function setLightTheme(): void{
	Cookies.set('theme', 'light', {path: '/', expires: 999, sameSite: 'strict'});
	console.log('set light');
}

export default function Theme(): JSX.Element {
	const [color, setColor] = useState(Cookies.get('cursorColor') ?? '#FFFFFF');
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
			<RgbStringColorPicker color={color} onChange={setColor}/>
		</div><br/><br/>
		<h1>Site theme:</h1>
		<button onClick={setDarkTheme}>Dark</button>
		<button onClick={setLightTheme}>Light</button>
	</>);
}
