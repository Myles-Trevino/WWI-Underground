/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import * as MobX from 'mobx';
import {observer} from 'mobx-react-lite';
import * as Three from 'three';
import * as _ from 'lodash';
import classNames from 'classnames';

import type * as Types from '../common/types';
import * as Helpers from '../common/helpers';
import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Panorama from '../components/tour/panorama/panorama';
import Nodes from '../components/tour/nodes/nodes';
import NodeViewer from '../components/tour/node-viewer';
import NodeEditor from '../components/tour/node-editor';
import Map from '../components/tour/map/map';
import Styles from './tour.module.scss';


export default observer(function Viewer(): JSX.Element {

	const state = useContext(StateContext);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [mapVisible, setMapVisible] = useState(false);
	const [nodesVisible, setNodesVisible] = useState(true);
	const [featuredNodesVisble, setFeaturedNodesVisible] = useState(false);


	// Initializer.
	useEffect(() => { Helpers.loadDefaultWwiu(state); }, []);


	// Opens a file selector for WWIU loading.
	function selectWwiu(): void {
		const fileInput = fileInputRef.current;
		if(!fileInput) throw new Error('Failed to open the file selection menu.');
		fileInput.click();
	}


	// Loads the selected WWIU file.
	async function fileSelectionCallback(
		event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
		const files = event.target.files;
		if(!files) return;
		Helpers.loadWwiu(state, JSON.parse(await files[0].text()));
	}


	// Saves a WWIU file.
	function saveWwiu(): void {
		const data = JSON.stringify(MobX.toJS(state.panoramas.panoramas));
		const blob = new Blob([data], {type: 'text/plain'});
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'Tour.wwiu';
		link.click();
		link.remove();
	}


	// Toggles edit mode.
	function toggleEditMode(): void {
		state.panoramas.setEditNode(undefined);
		state.panoramas.setViewNode(undefined);
		state.panoramas.toggleEditMode();
	}


	// Sets the panorama's default rotation.
	function setDefaultRotation(): void {
		state.panoramas.getDefinedPanorama().defaultRotation =
			state.panoramas.rotation.clone();

		state.app.setMessage('Default rotation set.');
	}


	// Adds a node to the current panorama.
	function addNode(type: Types.NodeType): void {

		const panorama = state.panoramas.getDefinedPanorama();

		// Generate a unique name for the node.
		let uniqueName = 'New Node';
		let enumerator = 2;

		while(_.has(panorama.nodes, uniqueName)){
			uniqueName = `New Node ${enumerator}`;
			++enumerator;
		}

		// Add the node.
		state.panoramas.addNode(uniqueName, {
			type,
			position: new Three.Vector3(0, 0, 1)
				.applyEuler(state.panoramas.camera.rotation)
		});
	}

	// Navigate to a node selected from the featured nodes menu.
	function goToFeaturedNode(panoramaName: string, nodeName: string): void {

		const panorama = state.panoramas.getDefinedPanorama(panoramaName);
		const node = panorama.nodes[nodeName];

		// Navigate to panorama.
		state.panoramas.setPanorama(panoramaName);

		// Open the information node viewer.
		state.panoramas.setViewNode(nodeName);

		// Set rotation to face node.
		// This method doesn't seem to work:
		// 		state.panoramas.camera.lookAt(node.position.x, node.position.y, node.position.z);
		// This is how the rotation is usually set:
		// 		state.panoramas.setRotation(new Three.Vector2(
		//			panorama.defaultRotation.x, panorama.defaultRotation.y));
		//		camera.setRotationFromEuler(getEuler());
		// Something else is getting in the way of rotating the camera here maybe...
		// I think maybe the panorama sets default rotation at the end of the initializer, after this code has already executed.
	}

	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Tour - {Constants.websiteName}</title>
		</Head>

		{/* Panorama and nodes. */}
		<Panorama>
			{nodesVisible && <Nodes/>}
		</Panorama>

		{/* Crosshair. */}
		<div className={Styles.crosshair}/>

		{/* Node viewer and editor. */}
		<NodeViewer/>
		<NodeEditor/>

		{/* Buttons. */}
		<div className={classNames('tile', Styles.buttonContainer)}>

			{/* Edit. */}
			{!state.panoramas.editMode && <svg className="button" onClick={toggleEditMode} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M24,5l3,3L10,25l-2.79.7a.75.75,0,0,1-.91-.91L7,22Z"/>
				<line className="svg-stroke-glyph" x1="21.5" y1="7.5" x2="24.5" y2="10.5"/>
			</svg>}

			{/* View. */}
			{state.panoramas.editMode && <svg className="button" onClick={toggleEditMode} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M4,16s5-6,12-6,12,6,12,6-5,6-12,6S4,16,4,16Z"/>
				<circle className="svg-stroke-glyph" cx="16" cy="16" r="2.5"/>
			</svg>}

			{/* Show map. */}
			{!mapVisible && <svg className="button" onClick={(): void => { setMapVisible(true); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<polygon className="svg-stroke-glyph" points="6 9 6 25 11 23 16 25 21 23 26 25 26 9 21 7 16 9 11 7 6 9"/>
				<line className="svg-stroke-glyph" x1="11" y1="7" x2="11" y2="23"/>
				<line className="svg-stroke-glyph" x1="16" y1="9" x2="16" y2="25"/>
				<line className="svg-stroke-glyph" x1="21" y1="7" x2="21" y2="23"/>
			</svg>}

			{/* Hide map. */}
			{mapVisible && <svg className="button" onClick={(): void => { setMapVisible(false); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<polygon className="svg-stroke-glyph" points="6 9 6 25 11 23 16 25 21 23 26 25 26 9 21 7 16 9 11 7 6 9"/>
				<line className="svg-stroke-glyph" x1="12" y1="12" x2="20" y2="20"/>
				<line className="svg-stroke-glyph" x1="20" y1="12" x2="12" y2="20"/>
			</svg>}

			{/* Download. */}
			<svg className="button" onClick={(): void => { saveWwiu(); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<polygon className="svg-stroke-glyph" points="6 6 6 26 26 26 26 11 21 6 6 6"/>
				<polyline className="svg-stroke-glyph" points="21 6 21 12 12 12 12 6"/>
				<circle className="svg-stroke-glyph" cx="16" cy="19" r="3"/>
			</svg>

			{/* Upload. */}
			<svg className="button" onClick={(): void => { selectWwiu(); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<line className="svg-stroke-glyph" x1="16" y1="28" x2="16" y2="10.59"/>
				<path className="svg-stroke-glyph" d="M11,14.59l4.3-4.3a1,1,0,0,1,1.4,0l4.3,4.3"/>
				<path className="svg-stroke-glyph" d="M12,18H6.44S4,16.88,4,14.68A3.88,3.88,0,0,1,7,11,4.37,4.37,0,0,1,8,8a4,4,0,0,1,4-1s1-3,5-3c6,0,6,5,6,5s5,0,5,5c0,4-5,4-5,4H20"/>
			</svg>

			{/* Show nodes. */}
			{!nodesVisible && <svg className="button" onClick={(): void => { setNodesVisible(true); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M16,27A11,11,0,1,1,27,16,11,11,0,0,1,16,27Z"/>
				<path className="svg-stroke-glyph" d="M16,20.25A4.25,4.25,0,1,1,20.25,16,4.25,4.25,0,0,1,16,20.25Z"/>
			</svg>}

			{/* Hide nodes. */}
			{nodesVisible && <svg className="button" onClick={(): void => { setNodesVisible(false); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M16,27A11,11,0,1,1,27,16,11,11,0,0,1,16,27Z"/>
				<line className="svg-stroke-glyph" x1="12" y1="12" x2="20" y2="20"/>
				<line className="svg-stroke-glyph" x1="20" y1="12" x2="12" y2="20"/>
			</svg>}

			{/* Show featured nodes. */}
			{!featuredNodesVisble && <svg className="button" onClick={(): void => { setFeaturedNodesVisible(true); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<line className="svg-stroke-glyph" x1="16" y1="28" x2="16" y2="10.59"/>
				<path className="svg-stroke-glyph" d="M11,14.59l4.3-4.3a1,1,0,0,1,1.4,0l4.3,4.3"/>
				<path className="svg-stroke-glyph" d="M12,18H6.44S4,16.88,4,14.68A3.88,3.88,0,0,1,7,11,4.37,4.37,0,0,1,8,8a4,4,0,0,1,4-1s1-3,5-3c6,0,6,5,6,5s5,0,5,5c0,4-5,4-5,4H20"/>
			</svg>}

			{/* Hide featured nodes. */}
			{featuredNodesVisble && <svg className="button" onClick={(): void => { setFeaturedNodesVisible(false); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<line className="svg-stroke-glyph" x1="16" y1="28" x2="16" y2="10.59"/>
				<path className="svg-stroke-glyph" d="M11,14.59l4.3-4.3a1,1,0,0,1,1.4,0l4.3,4.3"/>
				<path className="svg-stroke-glyph" d="M12,18H6.44S4,16.88,4,14.68A3.88,3.88,0,0,1,7,11,4.37,4.37,0,0,1,8,8a4,4,0,0,1,4-1s1-3,5-3c6,0,6,5,6,5s5,0,5,5c0,4-5,4-5,4H20"/>
			</svg>}

		</div>

		{/* Map. */}
		{mapVisible && !state.panoramas.editMode && <Map/>}

		{/* Edit mode popup. */}
		{state.panoramas.editMode &&
		<div className={classNames('tile', Styles.editModeTile)}>

			<div className={Styles.editModeTileTop}>
				<h2>Edit Mode</h2>
				<span>Panorama {state.panoramas.panoramaName}</span>
			</div>

			<button onClick={setDefaultRotation}>Set Default Rotation</button>
			<button onClick={(): void => { addNode('Information'); }}>
				Add Information
			</button>
			<button onClick={(): void => { addNode('Navigation'); }}>
				Add Navigation
			</button>
		</div>}

		{/* Featured nodes popup. */}
		{featuredNodesVisble &&
		<div className={classNames('tile', Styles.featuredNodesPopup)}>
			<h3>Featured Nodes</h3>
			<button onClick={(): void => { goToFeaturedNode('5', '"L. E. WILLIAMS"'); }}>&quot;L. E. WILLIAMS&quot;</button>
			<p>Sgt. Lewis Earl Williams was born in New York. He enlisted in June 1917 and was discharged in June 1919.</p>
			<button onClick={(): void => { goToFeaturedNode('10', '"W.D. BERTINI"'); }}>&quot;W.D. BERTINI&quot;</button>
			<p>Cpl. William Deforest Bertini was born in Connecticut and served for 2 years. Bertini became the first mayor of Wallingford, Connecticut after his return from the war.</p>
		</div>}

		{/* File input. */}
		<input ref={fileInputRef} type="file" style={{display: 'none'}}
			onChange={fileSelectionCallback}/>

	</>);
});
