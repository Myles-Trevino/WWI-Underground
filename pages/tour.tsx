/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {observer} from 'mobx-react-lite';
import classNames from 'classnames';
import * as Three from 'three';

import * as Types from '../common/types';
import * as Api from '../common/api';
import Constants from '../common/constants';
import * as Helpers from '../common/helpers';
import StateContext from '../common/state/state-context';
import Panorama from '../components/tour/panorama/panorama';
import Nodes from '../components/tour/nodes/nodes';
import NodeViewer from '../components/tour/node-viewer';
import NodeEditor from '../components/tour/node-editor';
import Map from '../components/tour/map/map';
import Styles from './tour.module.scss';


export default observer(function Viewer(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();
	const [mapVisible, setMapVisible] = useState(false);
	const [nodesVisible, setNodesVisible] = useState(true);
	const [featuredNodesVisble, setFeaturedNodesVisible] = useState(false);
	const [nodeListVisble, setNodeListVisible] = useState(false);
	const [editable, setEditable] = useState(false);
	const [nodeList, setNodeList] = useState<JSX.Element[] | undefined>();


	// Initializer.
	useEffect(() => { initialize(); }, [router.isReady, router.query]);

	async function initialize(): Promise<void> {

		if(!router.isReady) return;
		await Helpers.automaticLogin(state, router, false);

		// Reset the tour state.
		state.tour.reset();

		// Load the tour from the given ID or load the default tour if no ID was provided.
		let {id} = router.query;
		id = (id !== undefined && !Array.isArray(id)) ? id : Constants.defaultTourId;

		const tour = (id === Constants.defaultTourId) ?
			await state.app.getDefaultTour(state) : await Api.getTour(state, id);

		setEditable(state.app.loggedIn ? await Api.isEditable(state, id) : false);

		state.tour.setTour(tour, id);

		// Create the node list.
		createNodeList();
	}


	// Saves the tour.
	async function saveTour(): Promise<void> {

		try {
			if(!state.tour.tour || !state.tour.id) return;
			await Api.saveTour(state, state.tour.id, state.tour.tour);
			state.app.setMessage('Tour saved.');
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Toggles edit mode.
	function toggleEditMode(): void {
		state.tour.setEditNode(undefined);
		state.tour.setViewNode(undefined);
		state.tour.toggleEditMode();
	}


	// Sets the panorama's default rotation.
	function setDefaultRotation(): void {
		state.tour.getDefinedPanorama().defaultRotation = state.tour.rotation.clone();
		state.app.setMessage('Default rotation set.');
	}


	// Adds a node to the current panorama.
	function addNode(type: Types.NodeType): void {
		const panorama = state.tour.getDefinedPanorama();
		const uniqueName = Helpers.generateUniqueName('New Node', panorama.nodes);

		const node = (type === 'Information') ?
			Types.defaultInformationNode : Types.defaultNavigationNode;

		node.position = new Three.Vector3(0, 0, 1).applyEuler(state.tour.camera.rotation);

		state.tour.addNode(uniqueName, node);
	}


	// Toggles featured node visibility.
	function toggleFeaturedNodes(): void {
		setNodeListVisible(false);
		setFeaturedNodesVisible(!featuredNodesVisble);
	}


	// Toggles the node list.
	function toggleNodeList(): void {
		setFeaturedNodesVisible(false);
		setNodeListVisible(!nodeListVisble);
	}


	// Creates the node list.
	function createNodeList(filter?: string): void {

		const tour = state.tour.tour;
		if(!tour) return;

		const result: JSX.Element[] = [];
		if(filter) filter = filter.toLowerCase();

		for(const [panoramaName, panorama] of Object.entries(tour.panoramas))
			for(const [nodeName, node] of Object.entries(panorama.nodes)){

				if(node.type !== 'Information') continue;
				const title = `${panoramaName} - ${nodeName}`;

				if(filter && !title.toLowerCase().includes(filter)) continue;

				result.push(<span key={title} className="clickable">{title}</span>);
			}

		setNodeList(result);
	}


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
		<div className={Styles.crosshair} style={{backgroundColor: state.app.crosshairColor}}/>

		{/* Node viewer and editor. */}
		<NodeViewer/>
		<NodeEditor/>

		{/* Buttons. */}
		<div className={classNames('tile', Styles.buttonContainer)}>

			{/* Edit. */}
			{editable && !state.tour.editMode && <svg className="button" onClick={toggleEditMode} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M24,5l3,3L10,25l-2.79.7a.75.75,0,0,1-.91-.91L7,22Z"/>
				<line className="svg-stroke-glyph" x1="21.5" y1="7.5" x2="24.5" y2="10.5"/>
			</svg>}

			{/* View. */}
			{state.tour.editMode && <svg className="button" onClick={toggleEditMode} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M4,16s5-6,12-6,12,6,12,6-5,6-12,6S4,16,4,16Z"/>
				<circle className="svg-stroke-glyph" cx="16" cy="16" r="2.5"/>
			</svg>}

			{/* Save. */}
			{editable && state.app.loggedIn && <svg className="button" onClick={saveTour} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<polygon className="svg-stroke-glyph" points="6 6 6 26 26 26 26 11 21 6 6 6"/>
				<polyline className="svg-stroke-glyph" points="21 6 21 12 12 12 12 6"/>
				<circle className="svg-stroke-glyph" cx="16" cy="19" r="3"/>
			</svg>}

			{/* Hide nodes. */}
			{nodesVisible && <svg className="button" onClick={(): void => { setNodesVisible(false); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M16,27A11,11,0,1,1,27,16,11,11,0,0,1,16,27Z"/>
				<line className="svg-stroke-glyph" x1="12" y1="12" x2="20" y2="20"/>
				<line className="svg-stroke-glyph" x1="20" y1="12" x2="12" y2="20"/>
			</svg>}

			{/* Show nodes. */}
			{!nodesVisible && <svg className="button" onClick={(): void => { setNodesVisible(true); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-stroke-glyph" d="M16,27A11,11,0,1,1,27,16,11,11,0,0,1,16,27Z"/>
				<path className="svg-stroke-glyph" d="M16,20.25A4.25,4.25,0,1,1,20.25,16,4.25,4.25,0,0,1,16,20.25Z"/>
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

			{/* Toggle featured nodes. */}
			{<svg className="button" onClick={(): void => { toggleFeaturedNodes(); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<polygon className="svg-stroke-glyph" points="16 5 19 13 27 13 20.5 18 23 26 16 21 9 26 11.5 18 5 13 13 13 16 5"/>
			</svg>}

			{/* Toggle node list. */}
			{<svg className="button" onClick={(): void => { toggleNodeList(); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<rect className="svg-stroke-glyph" x="13" y="21" width="13" height="4"/>
				<rect className="svg-stroke-glyph" x="6" y="21" width="4" height="4"/>
				<rect className="svg-stroke-glyph" x="13" y="14" width="13" height="4"/>
				<rect className="svg-stroke-glyph" x="6" y="14" width="4" height="4"/>
				<rect className="svg-stroke-glyph" x="13" y="7.01" width="13" height="4"/>
				<rect className="svg-stroke-glyph" x="6" y="7.01" width="4" height="4"/>
			</svg>}

		</div>

		{/* Map. */}
		{mapVisible && !state.tour.editMode && <Map/>}

		{/* Edit mode popup. */}
		{state.tour.editMode &&
		<div className={classNames('tile', Styles.editModeTile)}>

			<div className={Styles.editModeTileTop}>
				<h2>Edit Mode</h2>
				<span>{state.tour.panorama}</span>
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
		<div className={classNames('gridTile', Styles.nodeList)}>
			<h3 className="gridTileSection">Featured Nodes</h3>
		</div>}

		{/* Node list popup. */}
		{nodeListVisble &&
		<div className={classNames('gridTile', Styles.nodeList)}>

			<h3 className="gridTileSection">All Nodes</h3>
			<div className="solidDivider"></div>
			<input className="gridTileSection" placeholder="Search" onChange={(e): void => { createNodeList(e.target.value); }}></input>

			<div className={Styles.nodeListWrapper}>
				<div className="dashedDivider"></div>
				<div style={{overflowY: 'auto'}}>
					<div className={Styles.nodeListList}>{nodeList}</div>
				</div>
			</div>

		</div>}

	</>);
});
