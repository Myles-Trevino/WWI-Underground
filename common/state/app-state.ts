/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {makeAutoObservable} from 'mobx';
import {v4 as uuidv4} from 'uuid';
import type {AxiosError} from 'axios';

import * as Api from '../api';
import type * as Types from '../types';
import Constants from '../constants';


export default class AppState {

	public email?: string;
	public name?: string;
	public tours: Types.TourEntry[] = [];
	public connections: Types.Connection[] = [];
	public loggedIn = false;
	public accessKey?: string;
	public defaultTour?: Types.Tour;

	public message = '';
	public messageDuration = 0;
	public messageId = '';
	public messageType: Types.MessageType = 'Default';


	// Constructor.
	public constructor(){ makeAutoObservable(this); }


	// Setters.
	public setEmail(email?: string): void {
		if(!email) return;
		this.email = email;
		localStorage.setItem(Constants.emailKey, email);
	}

	public setAccessKey(accessKey?: string): void {
		if(!accessKey) return;
		this.accessKey = accessKey;
		localStorage.setItem(Constants.accessKeyKey, accessKey);
	}

	public setUserData(userData: Types.UserData): void {
		this.name = userData.name;
		this.tours = userData.tours;
		this.connections = userData.connections;
	}

	public setLoggedIn(loggedIn: boolean): void { this.loggedIn = loggedIn; }

	public setTours(tours: Types.TourEntry[]): void { this.tours = tours; }

	public setConnections(connections: Types.Connection[]): void {
		this.connections = connections;
	}

	public setDefaultTour(tour: Types.Tour): void { this.defaultTour = tour; }

	public setMessage(message: string, duration = 5000,
		type: Types.MessageType = 'Default'): void {
		this.message = message;
		this.messageDuration = duration;
		this.messageId = uuidv4();
		this.messageType = type;
	}

	public setErrorMessage(error: unknown): void {
		let message = '';

		// Axios errors.
		const axiosError = error as AxiosError<string>;
		if(axiosError.response) message = axiosError.response.data;

		// Default errors.
		else message = (error as Error).message;

		console.error(message);
		this.setMessage(message, 5000, 'Error');
	}


	// Getters.
	public getAccessCredentials(): Types.AccessCredentials {

		if(!this.email || !this.accessKey)
			throw new Error('Could not form the access credentials.');

		return {email: this.email, accessKey: this.accessKey};
	}

	public async getDefaultTour(state: Types.State): Promise<Types.Tour> {

		try {
			if(this.defaultTour) return this.defaultTour;
			this.setDefaultTour(await Api.getTour());
		}

		catch(error: unknown){ state.app.setErrorMessage(error); }

		if(!this.defaultTour) throw new Error('Could not get the default tour.');
		return this.defaultTour;
	}
}
