/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Axios from 'axios';

import type * as Types from './types';
import Constants from './constants';


const defaultPanorama = '1';


// Loads the default WWIU file.
export async function loadDefaultWwiu(state: Types.State): Promise<void> {

	try {
		const response = await Axios.get(Constants.defaultWwiuUrl);
		loadWwiu(state, response.data);
	}

	catch(error: unknown){ state.app.setErrorMessage(error as Error); }
}


// Loads the given WWIU file data.
export function loadWwiu(state: Types.State,
	panoramas: Record<string, Types.Panorama>): void {
	state.panoramas.setPanoramas(panoramas);
	state.panoramas.setPanorama(defaultPanorama);
}


// Sleeps for the given duration in milliseconds.
export async function sleep(milliseconds?: number): Promise<void> {
	await new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}
