/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type AppState from './state/app-state';
import type PanoramasState from './state/panoramas-state';


export type State = {
	app: AppState;
	panoramas: PanoramasState;
};


export type Position = {
	x: number;
	y: number;
	z: number;
};


export type NodeType = 'Information' | 'Navigation';

export type Node = {
	type: NodeType;
	position: Position;
	description?: string;
	panorama?: string;
};


export type Rotation = {
	x: number;
	y: number;
};

export type Panorama = {
	defaultRotation: Rotation;
	nodes: Record<string, Node>;
};


export type MessageType = 'Default' | 'Error';


export type LoginCredentials = {email: string; password: string};

export type AccessCredentials = {email: string; accessKey: string};


// API.
export type ConnectionStatus = 'Sent' | 'Received' | 'Accepted';

export type Connection = {
	name: string;
	status: ConnectionStatus;
};


export type Tour = {
	name: string;
	id: string;
};


export type UserData = {
	name: string;
	connections: Connection[];
	tours: Tour[];
};

export const defaultUserData: UserData = {name: '', connections: [], tours: []};


export type TourInfo = {
	name: string;
	author: string;
};
