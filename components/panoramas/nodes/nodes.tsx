/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import * as Three from 'three';

import Styles from './nodes.module.scss';
import StateContext from '../../../common/state/state-context';


export default observer(function Nodes(){

	const state = useContext(StateContext);


	// When a node is clicked...
	function nodeClickCallback(name: string): void {

		try {
			const node = state.panoramas.getDefinedPanorama().nodes[name];

			// If in edit mode, open the editor.
			if(state.panoramas.editMode) state.panoramas.setEditNode(name);

			// If in view mode...
			else {

				// If this is a navigation node, navigate to its panorama.
				if(node.type === 'Navigation'){
					if(!node.panorama) throw new Error('No panorama set.');
					state.panoramas.setPanorama(node.panorama);
				}

				// If this is an information node, open the information node viewer.
				else state.panoramas.setViewNode(name);
			}
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error as Error); }
	}


	// If there is no panorama loaded, render nothing.
	const panorama = state.panoramas.getPanorama();
	if(!panorama || state.panoramas.loading) return (<></>);


	// For each node in the loaded panorama...
	const nodes = [];
	for(const [name, value] of Object.entries(panorama.nodes)){

		// Calculate the node's screen space position.
		const position = new Three.Vector3(value.position.x, value.position.y,
			value.position.z).project(state.panoramas.camera);

		if(position.z < 1) continue; // Skip mirrored nodes.

		// Calculate the FOV scaling.
		const fovScale = Three.MathUtils.mapLinear(state.panoramas.fov,
			state.panoramas.maximumFov, state.panoramas.minimumFov, 0.5, 2);

		// Generate the style.
		const size = value.size*fovScale;
		const halfSize = size/2;

		const nodeStyle = {
			left: (position.x+1)/2*window.innerWidth,
			top: (-position.y+1)/2*window.innerHeight,
			width: `${size}rem`,
			height: `${size}rem`,
			borderRadius: (value.type === 'Information') ? `${halfSize}rem` : undefined,
			transform: `translate(-50%, -50%)`
		};

		const labelStyle = {
			bottom: `${size-0.5}rem`,
			left: `${size/2}rem`,
			transform: `translate(-50%, -50%)`
		};

		// Add the node object.
		nodes.push(
			<div key={name} className={Styles.node} style={nodeStyle}
				onClick={(): void => { nodeClickCallback(name); }}>
				<span className={Styles.nodeLabel} style={labelStyle}>{name}</span>
			</div>
		);
	}

	// Render the nodes.
	return (<div>{nodes}</div>);
});
