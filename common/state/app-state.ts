/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {makeAutoObservable} from 'mobx';
import {v4 as uuidv4} from 'uuid';

import type * as Types from '../types';


export default class AppState {

	public message = '';
	public messageDuration = 0;
	public messageId = '';
	public readonly nodes: Types.Node[] = [];


	// Constructor.
	public constructor(){ makeAutoObservable(this); }


	// Setters.
	public addNode(node: Types.Node): void { this.nodes.push(node); }

	public setMessage(message: string, duration = 5000): void {
		this.message = message;
		this.messageDuration = duration;
		this.messageId = uuidv4();
	}

	public setErrorMessage(error: Error): void { this.setMessage(error.message); }
}
