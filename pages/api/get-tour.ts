/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import FSE from 'fs-extra';
import Joi from 'joi';

import type * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import Constants from '../../common/constants';


export default function getTour(request: NextApiRequest,
	response: NextApiResponse): void {

	try {
		// Validate the body.
		const schema = Joi.object({
			accessCredentials: Validation.accessCredentialsSchema,
			id: Validation.idSchema
		});

		const body = Validation.validate(request.body, schema) as Types.GetTourRequest;

		// If no access credentials or no tour ID was specified, load the default tour.
		let tourId: string | undefined = undefined;
		if(!body.accessCredentials || !body.id) tourId = Constants.defaultTourId;

		// Otherwise, load the requested tour.
		else tourId = body.id;

		// Generate the tour data structure.
		const directory = `${Constants.toursFolder}/${tourId}`;
		const information = getInformation<Types.TourInformation>(directory);

		const tour: Types.Tour = {
			...information,
			panoramas: getPanoramas(directory)
		};

		// Return the data structure.
		response.status(200).json(tour);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}


// Gets the panoramas in the given tour path.
function getPanoramas(tourPath: string): Record<string, Types.Panorama> {

	const panoramas: Record<string, Types.Panorama> = {};
	const entries = FSE.readdirSync(tourPath, {withFileTypes: true});

	for(const entry of entries){

		if(!entry.isDirectory()) continue;
		const name = entry.name;
		const directory = `${tourPath}/${name}`;
		const information = getInformation<Types.PanoramaInformation>(directory);

		panoramas[name] = {
			...information,
			nodes: getNodes(directory)
		};
	}

	return panoramas;
}


// Gets the nodes in the given panorama directory.
function getNodes(panoramaDirectory: string): Record<string, Types.Node> {

	const nodes: Record<string, Types.Node> = {};
	const entries = FSE.readdirSync(panoramaDirectory, {withFileTypes: true});

	for(const entry of entries){

		if(!entry.isDirectory()) continue;
		const name = entry.name;
		const directory = `${panoramaDirectory}/${name}`;
		const information = getInformation<Types.NodeInformation>(directory);

		nodes[name] = {...information};
	}

	return nodes;
}


// Gets the information file in the given directory.
function getInformation<T>(directory: string): T {
	return FSE.readJsonSync(`${directory}/${Constants.tourInformationFile}`) as T;
}
