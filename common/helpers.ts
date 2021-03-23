/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextRouter} from 'next/router';
import type {AxiosError} from 'axios';
import * as _ from 'lodash';

import type * as Types from './types';
import * as Api from './api';
import Constants from '../common/constants';


// Sleeps for the given duration in milliseconds.
export async function sleep(milliseconds?: number): Promise<void> {
	await new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}


// Attempts automatic login
export async function automaticLogin(
	state: Types.State, router: NextRouter): Promise<void> {

	try {
		// Load cached credentials.
		const cachedEmailAddress = localStorage.getItem(Constants.emailKey);
		const cachedAccessKey = localStorage.getItem(Constants.accessKeyKey);
		if(!cachedEmailAddress || !cachedAccessKey) throw new Error();
		state.app.setEmail(cachedEmailAddress);
		state.app.setAccessKey(cachedAccessKey);

		// Load the user data.
		await loadUserData(state, router);
		state.app.setLoggedIn(true);
	}

	// Handle errors.
	catch(error: unknown){ router.push('/login'); }
}


// Loads the user data and sets login status.
export async function loadUserData(state: Types.State,
	router: NextRouter): Promise<void> {

	try {
		// Load the user data.
		const userData = await Api.getUserData(state);
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


// Generates a unique name.
export function generateUniqueName<T>(base: string,
	entries: Record<string, T>): string {

	let uniqueName = base;
	let enumerator = 2;

	while(_.has(entries, uniqueName)){
		uniqueName = `${base} ${enumerator}`;
		++enumerator;
	}

	return uniqueName;
}
