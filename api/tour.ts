/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import FSE from 'fs-extra';
import * as _ from 'lodash';

import Constants from '../common/constants';
import type * as Types from '../common/types';


// Removes the given tour.
export function remove(id: string): void {
	const directory = `${Constants.toursFolder}/${id}`;
	FSE.removeSync(directory);
}


// Saves the given tour.
export function save(id: string, tour: Types.Tour): void {
	const directory = `${Constants.toursFolder}/${id}`;

	FSE.removeSync(directory);
	const information: Types.TourInformation = _.omit(tour, 'panoramas');
	saveInformation(directory, information);

	for(const [name, panorama] of Object.entries(tour.panoramas))
		savePanorama(`${directory}/${name}`, panorama);
}


// Converts the given panorama to files.
function savePanorama(directory: string, panorama: Types.Panorama): void {

	const information: Types.PanoramaInformation = _.omit(panorama, 'nodes');
	saveInformation(directory, information);

	for(const [name, node] of Object.entries(panorama.nodes))
		saveNode(`${directory}/${name}`, node);
}


// Converts the given node to files.
function saveNode(directory: string, node: Types.Node): void {

	saveInformation(directory, node);
	if(node.article) FSE.writeFileSync(`${directory}/article.txt`, node.article);
}


// Saves the given information as a file in the given directory.
function saveInformation(directory: string, json: unknown): void {
	FSE.mkdirsSync(directory);
	FSE.writeJsonSync(`${directory}/${Constants.tourInformationFile}`, json);
}
