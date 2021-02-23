/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {makeAutoObservable} from 'mobx';
import {v4 as uuidv4} from 'uuid';
import type {AxiosError} from 'axios';

import type * as Types from '../types';


export default class AppState {

	public accessCredentials?: Types.AccessCredentials;
	public userData?: Types.UserData;

	public message = '';
	public messageDuration = 0;
	public messageId = '';
	public messageType: Types.MessageType = 'Default';

	public readonly nodes: Types.Node[] = [];


	// Constructor.
	public constructor(){ makeAutoObservable(this); }


	// Setters.
	public setAccessCredentials(accessCredentials: Types.AccessCredentials): void {
		this.accessCredentials = accessCredentials;
	}

	public setUserData(userData: Types.UserData): void { this.userData = userData; }

	public addNode(node: Types.Node): void { this.nodes.push(node); }

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
}
