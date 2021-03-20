/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import classNames from 'classnames';

import PanoramasStyles from './panoramas.module.scss';
import StateContext from '../../common/state/state-context';


export default observer(function NodeViewer(){

	const state = useContext(StateContext);


	// Exits the viewer.
	function exit(): void { state.panoramas.setViewNode(undefined); }


	// If there is no valid information node selected for viewing, render nothing.
	const panorama = state.panoramas.getPanorama();
	const name = state.panoramas.viewNodeName;
	const node = (name && panorama) ? panorama.nodes[name] : undefined;
	if(!node) return (<></>);

	// Render the information node.
	return (
		<div className={classNames('gridTile', PanoramasStyles.nodeModal)}>

			{/* Name. */}
			<h2 className="tileSection">{name}</h2>
			<div className="solidDivider"></div>

			{/* Description */}
			<p className="tileSection">{node.description ? node.description : 'No description.'}</p>

			{/* Buttons. */}
			<button onClick={exit} className="tileSection">Close</button>

		</div>
	);
});
