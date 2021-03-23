/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {createContext} from 'react';
import {enableStaticRendering} from 'mobx-react-lite';

import type * as Types from '../types';
import AppState from './app-state';
import TourState from './tour-state';


// Determine whether this is currently executing on the server (SSR) or in the browser.
const isServer = (typeof window === 'undefined');

// If on the server, disable MobX observer subscriptions.
enableStaticRendering(isServer);


// The global state interface.
let state: Types.State | undefined = undefined;


// Returns the global state.
function getState(): Types.State {

	// Create a new global state object if necessary.
	if(isServer || !state){
		const newState = {
			app: new AppState(),
			tour: new TourState()
		};

		// Always create a new state for SSR, ensuring that
		// separate requests each get their own state.
		if(isServer) return newState;

		// Create a new state when in the browser only if it does not already exist.
		if(!state) state = newState;
	}

	return state;
}


// The state context.
const StateContext = createContext<Types.State>(getState());
export default StateContext;
