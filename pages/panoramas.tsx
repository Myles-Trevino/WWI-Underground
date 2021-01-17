/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import React, {useContext, useEffect, useRef} from 'react';
import Head from 'next/head';
import {toJS} from 'mobx';
import {observer} from 'mobx-react-lite';
import * as Three from 'three';
import Axios from 'axios';
import * as _ from 'lodash';

import type * as Types from '../common/types';
import Constants from '../common/constants';
import Styles from './panoramas.module.scss';
import StateContext from '../common/state/state-context';
import Panorama from '../components/panoramas/panorama/panorama';
import Nodes from '../components/panoramas/nodes/nodes';
import NodeViewer from '../components/panoramas/node-viewer';
import NodeEditor from '../components/panoramas/node-editor';
import Message from '../components/common/message/message';


const defaultNodeSize = 5;
const defaultPanorama = '1';


export default observer(function Viewer(): JSX.Element {

	const state = useContext(StateContext);

	const fileInputRef = useRef<HTMLInputElement>(null);


	// One-time initialization.
	useEffect(() => { initialize(); }, []);


	// Loads the default WWIU file.
	async function initialize(): Promise<void> {
		try {
			const response = await Axios.get(Constants.defaultWwiuUrl);
			loadWwiu(response.data);
		}

		catch(error: unknown){ state.app.setErrorMessage(error as Error); }
	}


	// Loads the given WWIU file data.
	function loadWwiu(panoramas: Record<string, Types.Panorama>): void {
		state.panoramas.setPanoramas(panoramas);
		state.panoramas.setPanorama(defaultPanorama);
	}


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
		loadWwiu(JSON.parse(await files[0].text()));
	}


	// Saves a WWIU file.
	function saveWwiu(): void {
		const data = JSON.stringify(toJS(state.panoramas.panoramas));
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
			size: defaultNodeSize,
			position: new Three.Vector3(0, 0, 1)
				.applyEuler(state.panoramas.camera.rotation)
		});
	}


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>WWI Underground</title>
		</Head>

		{/* Panorama. */}
		<Panorama></Panorama>

		{/* Nodes. */}
		<Nodes></Nodes>

		{/* Node viewer and editor. */}
		<NodeViewer></NodeViewer>
		<NodeEditor></NodeEditor>

		{/* Buttons. */}
		<div className={Styles.buttonContainer}>
			<button onClick={toggleEditMode}>
				{state.panoramas.editMode ? 'View Mode' : 'Edit Mode'}
			</button>
			<button onClick={(): void => { addNode('Information'); }}>
				Add Information
			</button>
			<button onClick={(): void => { addNode('Navigation'); }}>
				Add Navigation
			</button>
			<button onClick={selectWwiu}>Load WWIU</button>
			<button onClick={saveWwiu}>Save WWIU</button>
		</div>

		{/* Message. */}
		<Message></Message>

		{/* File input. */}
		<input ref={fileInputRef} type="file" style={{display: 'none'}}
			onChange={fileSelectionCallback}></input>

	</>);
});
