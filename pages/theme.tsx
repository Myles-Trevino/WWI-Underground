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

let externalWindow: (globalThis.Window & typeof globalThis) | undefined = undefined;
let cursorColor = '';

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
	if(externalWindow !== undefined){
		externalWindow.localStorage.setItem('cursorColor', color);
	}
}

function setDarkTheme(): void{
	if(externalWindow !== undefined){
		externalWindow.localStorage.setItem('theme', 'dark');
	}
	console.log('set dark');
	Router.reload();
}

function setLightTheme(): void{
	if(externalWindow !== undefined){
		externalWindow.localStorage.setItem('theme', 'light');
	}
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
		<div className="themePageContainer">
			<div className="themePageSection">
				<h2>Cursor theme:</h2>
				<div className="colorPicker">
					<RgbStringColorPicker color={color} onChange={setCrosshairColorCookie}/>
				</div>
			</div>
			<br/><br/>
			<div className="themePageSection">
				<h2>Site theme:</h2>
				<button onClick={setDarkTheme}>Dark</button>
				<button onClick={setLightTheme}>Light</button>
			</div>
		</div>


	</>);
}
