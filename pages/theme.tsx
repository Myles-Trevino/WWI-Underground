/*
	Copyright Chris Dunphy, Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {RgbStringColorPicker} from 'react-colorful';
import Head from 'next/head';
import Constants from '../common/constants';
import React, {useContext} from 'react';
import classNames from 'classnames';

import StateContext from '../common/state/state-context';
import Styles from './theme.module.scss';


export default function Theme(): JSX.Element {

	const state = useContext(StateContext);


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Theme - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className={classNames('centerer', Styles.content)}>

			<div className="gridTile">
				<h2 className="tileSection">Cursor Color</h2>
				<div className="solidDivider"></div>
				<RgbStringColorPicker color={state.app.crosshairColor} onChange={(color): void => { state.app.setCrosshairColor(color); }} className={Styles.colorPicker}/>
			</div>

			<div className="gridTile">
				<h2 className="tileSection">Theme</h2>
				<div className="solidDivider"></div>
				<div className="gridTileSection">
					<button onClick={(): void => { state.app.setTheme('Dark'); }}>Dark</button>
					<button onClick={(): void => { state.app.setTheme('Light'); }}>Light</button>
				</div>
			</div>

		</div>

	</>);
}
