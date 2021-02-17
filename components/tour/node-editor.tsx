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
import PanoramasStyles from './panoramas.module.scss';
import StateContext from '../../common/state/state-context';


type FormValues = Types.Node & {name?: string};


export default observer(function NodeEditor(){

	const state = useContext(StateContext);


	// Returns the edit node name or throws an error if it does not exist.
	function getName(): string {
		const name = state.panoramas.editNodeName;
		if(!name) throw new Error('Invalid node name.');
		return name;
	}


	// Exits the viewer.
	function exit(): void { state.panoramas.setEditNode(undefined); }


	// Deletes the node and exits.
	function remove(): void {
		state.panoramas.deleteNode(getName());
		state.app.setMessage('Node deleted.');
		exit();
	}


	// Saves the changes to the node and exits.
	function save(values: FormValues): void {

		try {

			const oldName = getName();
			const name = values.name;
			delete values.name;

			// Validate.
			if(!name) throw new Error('Please enter a name.');

			// Change the node's name if it was modified.
			if(name !== oldName){
				state.panoramas.setNodeName(oldName, name);
				state.panoramas.setEditNode(name);
			}

			// Change the node's properties.
			state.panoramas.setNode(name, values);

			// Exit.
			state.app.setMessage('Changes saved.');
			exit();
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error as Error); }
	}


	// If there is no valid information node selected for viewing, render nothing.
	const panorama = state.panoramas.getPanorama();
	const name = state.panoramas.editNodeName;
	const node = (name && panorama) ? panorama.nodes[name] : undefined;

	if(!node) return (<></>);

	// Otherwise, store the initial form values.
	const initialValues: FormValues = {
		name,
		type: node.type,
		position: node.position
	};

	if(node.type === 'Information')
		initialValues.description = (node.description) ? node.description : '';

	else initialValues.panorama = (node.panorama) ? node.panorama : '';

	// Generate the type-specific inputs.
	let typeSpecificInputs = <></>;

	if(node.type === 'Information') typeSpecificInputs =
		<div className={PanoramasStyles.input}>
			<span>Description</span>
			<Field name="description" type="text" as="textarea"/>
		</div>;

	else typeSpecificInputs =
		<div className={PanoramasStyles.input}>
			<span>Panorama</span>
			<Field name="panorama" type="text"/>
		</div>;

	// Render.
	return (
		<Formik initialValues={initialValues} onSubmit={save}>
			<Form className={classNames('tile', PanoramasStyles.nodeModal)}>

				{/* Title. */}
				<h2>Node Editor</h2>

				{/* Inputs. */}
				<div className={PanoramasStyles.inputs}>

					{/* Name */}
					<div className={PanoramasStyles.input}>
						<span>Name</span>
						<Field name="name" type="text"></Field>
					</div>

					{/* Type-specific inputs. */}
					{typeSpecificInputs}

				</div>

				{/* Buttons. */}
				<div className={PanoramasStyles.buttonContainer}>
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
