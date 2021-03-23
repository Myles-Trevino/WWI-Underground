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
	function exit(): void { state.tour.setViewNode(undefined); }


	// If there is no valid information node selected for viewing, render nothing.
	const panorama = state.tour.getPanorama();
	const name = state.tour.viewNodeName;
	const node = (name && panorama) ? panorama.nodes[name] : undefined;
	if(!node) return (<></>);

	// Render the information node.
	return (
		<div className={classNames('gridTile', PanoramasStyles.nodeModal)}>

			{/* Name. */}
			<h2 className="tileSection">{name}</h2>
			{!node.imageUrl && <div className="solidDivider"></div>}

			{/* Image. */}
			{node.imageUrl && <div className={PanoramasStyles.imageContainer}>
				<img src={node.imageUrl}></img>
			</div>}

			{/* Article. */}
			<p className="tileSection">{node.article ? node.article : 'No article.'}</p>

			{/* Buttons. */}
			<button onClick={exit} className="tileSection">Close</button>

		</div>
	);
});
