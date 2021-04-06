/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import * as Three from 'three';
import classNames from 'classnames';

import Styles from './nodes.module.scss';
import StateContext from '../../../common/state/state-context';


export default observer(function Nodes(){

	const state = useContext(StateContext);


	// When a node is clicked...
	function nodeClickCallback(name: string): void {

		try {
			const node = state.tour.getDefinedPanorama().nodes[name];

			// If in edit mode, open the editor.
			if(state.tour.editMode) state.tour.setEditNode(name);

			// If in view mode...
			else {

				// If this is a navigation node, navigate to its panorama.
				if(node.type === 'Navigation'){
					if(!node.panorama) throw new Error('No panorama set.');
					state.tour.setPanorama(node.panorama);
				}

				// If this is an information node, open the information node viewer.
				else {
					// (unless this viewer is already open, in which case it is closed)
					if(state.tour.viewNodeName === name) state.tour.setViewNode(undefined);
					else state.tour.setViewNode(name);
				}
			}
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// If there is no panorama loaded, render nothing.
	const panorama = state.tour.getPanorama();
	if(!panorama || state.tour.loading) return (<></>);


	// For each node in the loaded panorama...
	const nodes: JSX.Element[] = [];
	for(const [name, value] of Object.entries(panorama.nodes)){

		// Calculate the node's screen space position.
		const position = new Three.Vector3(value.position.x, value.position.y,
			value.position.z).project(state.tour.camera);

		if(position.z < 1) continue; // Skip mirrored nodes.

		// Generate the node style.
		const isInformationNode = (value.type === 'Information');
		const style = {
			left: (position.x+1)/2*window.innerWidth,
			top: (-position.y+1)/2*window.innerHeight,
			transform: isInformationNode ? `` : `translate(-50%, -50%)`
		};

		// Information node.
		if(isInformationNode) nodes.push(
			<span key={name} className={classNames('tile', Styles.informationNode)} style={style} onClick={(): void => { nodeClickCallback(name); }}>{name}</span>
		);

		// Navigation node.
		else {
			const fovScale = Three.MathUtils.mapLinear(state.tour.fov,
				state.tour.maximumFov, state.tour.minimumFov, 0.5, 2);

			const markerStyle = {
				width: `${5*fovScale}rem`,
				height: `${5*fovScale}rem`
			};

			nodes.push(
				<div key={name} className={classNames('tile', Styles.navigationNode)} style={style}
					onClick={(): void => { nodeClickCallback(name); }}>
					<div style={markerStyle}/>
					<span>{name}</span>
				</div>
			);
		}
	}

	// Render the nodes.
	return (<div>{nodes}</div>);
});
