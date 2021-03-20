/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextRouter} from 'next/router';
import Axios from 'axios';
import type {AxiosError} from 'axios';

import type * as Types from './types';
import Constants from './constants';


const defaultPanorama = '1';


// Loads the default WWIU file.
export async function loadDefaultWwiu(state: Types.State): Promise<void> {

	try {
		const response = await Axios.get(Constants.defaultWwiuUrl);
		loadWwiu(state, response.data);
	}

	catch(error: unknown){ state.app.setErrorMessage(error); }
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


// Loads the user data.
export async function loadUserData(state: Types.State,
	router: NextRouter): Promise<void> {

	try {
		// Load the user data.
		const userData = (await Axios.post<Types.UserData>(`api/get-user-data`,
			{accessCredentials: state.app.accessCredentials})).data;

		state.app.setUserData(userData);
	}

	catch(error: unknown){

		// If a '403 - Forbidden' error was recieved, redirect to the validation page.
		const axiosError = error as AxiosError;
		if(axiosError.response?.status === 403) router.push('/validate');

		// Otherwise, rethrow.
		else throw error;
	}
}
