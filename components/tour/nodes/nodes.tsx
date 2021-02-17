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
	const nodes: JSX.Element[] = [];
	for(const [name, value] of Object.entries(panorama.nodes)){

		// Calculate the node's screen space position.
		const position = new Three.Vector3(value.position.x, value.position.y,
			value.position.z).project(state.panoramas.camera);

		if(position.z < 1) continue; // Skip mirrored nodes.

		// Generate the node style.
		const style = {
			left: (position.x+1)/2*window.innerWidth,
			top: (-position.y+1)/2*window.innerHeight,
			transform: `translate(-50%, -50%)`
		};

		// Information node.
		if(value.type === 'Information') nodes.push(
			<span key={name} className={classNames('tile', Styles.informationNode)} style={style} onClick={(): void => { nodeClickCallback(name); }}>{name}</span>
		);

		// Navigation node.
		else {
			const fovScale = Three.MathUtils.mapLinear(state.panoramas.fov,
				state.panoramas.maximumFov, state.panoramas.minimumFov, 0.5, 2);

			const markerStyle = {
				width: `${5*fovScale}rem`,
				height: `${5*fovScale}rem`
			};

			nodes.push(
				<div key={name} className={classNames('tile', Styles.navigationNode)} style={style}
					onClick={(): void => { nodeClickCallback(name); }}>
					<div style={markerStyle}></div>
					<span>{name}</span>
				</div>
			);
		}
	}

	// Render the nodes.
	return (<div>{nodes}</div>);
});
