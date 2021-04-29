/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Formik, Field, Form} from 'formik';
import classNames from 'classnames';

import type * as Types from '../../common/types';
import StateContext from '../../common/state/state-context';
import PanoramasStyles from './panoramas.module.scss';


type FormValues = Types.Node & {name?: string};


let panorama: Types.Panorama | undefined = undefined;
let name: string | undefined = undefined;
let node: Types.Node | undefined = undefined;


export default observer(function NodeEditor(){

	const state = useContext(StateContext);


	// Exits the viewer.
	function exit(): void { state.tour.setEditNode(undefined); }


	// Deletes the node and exits.
	function remove(): void {
		if(!name) throw new Error('No node name.');
		state.tour.deleteNode(name);
		state.app.setMessage('Node deleted.');
		exit();
	}


	// Saves the changes to the node and exits.
	function save(values: FormValues): void {

		try {
			if(!name) throw new Error('No node name.');
			const newName = values.name;
			delete values.name;

			if(!newName) throw new Error('Please enter a name.');

			// Change the node's name if it was modified.
			if(newName !== name){
				state.tour.setNodeName(name, newName);
				state.tour.setEditNode(newName);
			}

			// Save.
			state.tour.setNode(newName, values);

			// Exit.
			state.app.setMessage('Changes saved.');
			exit();
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}

	function addFeatured(): void {
		if(state.tour.editNodeName && state.tour.panorama) {
			const featuredNode = {name: state.tour.editNodeName, panorama: state.tour.panorama};
			state.tour.addFeaturedNode(featuredNode);
		}
	}

	function removeFeatured(): void {
		if(state.tour.editNodeName && state.tour.panorama) {
			const featuredNode = {name: state.tour.editNodeName, panorama: state.tour.panorama};
			state.tour.removeFeaturedNode(featuredNode);
		}
	}


	// If there is no valid information node selected for viewing, render nothing.
	panorama = state.tour.getPanorama();
	name = state.tour.editNodeName;
	node = (name && panorama) ? panorama.nodes[name] : undefined;

	if(!name || !node) return (<></>);

	// Otherwise, store the initial form values.
	const initialValues: FormValues = {...node, name};

	// Generate the type-specific inputs.
	let typeSpecificInputs = <></>;

	const isFeatured = (state.tour.editNodeName !== undefined && state.tour.panorama !== undefined &&
		(state.tour.tour?.featuredNodes.includes({name: state.tour.editNodeName, panorama: state.tour.panorama})));

	if(node.type === 'Information')
		typeSpecificInputs = <>
			<div className={PanoramasStyles.input}>
				<span>Image URL</span>
				<Field name="imageUrl" type="text"/>
			</div>

			<div className={PanoramasStyles.input}>
				<span>Article</span>
				<Field name="article" type="text" as="textarea"/>
			</div>

			<div>
				{!(isFeatured ?? false) ?
					<button type="button" onClick={addFeatured}>Feature</button> :
					<button type="button" onClick={removeFeatured}>Un-feature</button>
				}
			</div>
		</>;

	else typeSpecificInputs =
		<div className={PanoramasStyles.input}>
			<span>Panorama</span>
			<Field name="panorama" type="text"/>
		</div>;

	// Render.
	return (
		<Formik initialValues={initialValues} onSubmit={save}>
			<Form className={classNames('gridTile', PanoramasStyles.nodeModal)}>

				{/* Title. */}
				<h2 className="tileSection">Node Editor</h2>
				<div className="solidDivider"></div>

				{/* Inputs. */}
				<div className="gridTileSection">

					{/* Name */}
					<div className={PanoramasStyles.input}>
						<span>Name</span>
						<Field name="name" type="text"/>
					</div>

					{/* Type-specific inputs. */}
					{typeSpecificInputs}

				</div>

				{/* Buttons. */}
				<div className={classNames('tileSection', PanoramasStyles.buttonContainer)}>
					<button type="button" onClick={exit}>Cancel</button>
					<div className={PanoramasStyles.buttonGroup}>
						<button type="button" onClick={remove}>Delete</button>
						<button type="submit">Save</button>
					</div>
				</div>

			</Form>
		</Formik>
	);
});
