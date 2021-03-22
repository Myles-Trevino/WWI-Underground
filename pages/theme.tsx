/*
	Copyright Chris Dunphy
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {RgbStringColorPicker} from 'react-colorful';
import Head from 'next/head';
import Constants from '../common/constants';
import React, {useState} from 'react';
import Router from 'next/router';

let externalWindow: typeof window;
let cursorColor: string;

class Window extends React.Component{
	public componentDidMount(): void{
		externalWindow = window;
		cursorColor = externalWindow.localStorage.getItem('cursorColor') ?? '';
	}

	public render(): JSX.Element{
		return (<></>);
	}
}

function setCrosshairColorCookie(color: string): void{
	externalWindow.localStorage.setItem('cursorColor', color);
}

function setDarkTheme(): void{
	externalWindow.localStorage.setItem('theme', 'dark');
	console.log('set dark');
	Router.reload();
}

function setLightTheme(): void{
	externalWindow.localStorage.setItem('theme', 'light');
	console.log('set light');
	Router.reload();
}

export default function Theme(): JSX.Element {
	const [color, setColor] = useState('rgb(217, 255, 0)');

	// Note: each time the user goes to this page, the default crosshair/cursor color is set. Will fix.
	return (<>

		{/* Head. */}
		<Head>
			<title>Theme - {Constants.websiteName}</title>
		</Head>
		{/* Content. */}
		<Window></Window>
		<h1>Cursor theme:</h1>
		<div className = "colorPicker">
			<RgbStringColorPicker color={color} onChange={setCrosshairColorCookie}/>
		</div><br/><br/>
		<h1>Site theme:</h1>
		<button onClick={setDarkTheme}>Dark</button>
		<button onClick={setLightTheme}>Light</button>
	</>);
}
