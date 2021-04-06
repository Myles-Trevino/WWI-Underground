/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import { string } from 'joi';
import type MongoDB from 'mongodb';

import type AppState from './state/app-state';
import type TourState from './state/tour-state';


// General.
export type State = {
	app: AppState;
	tour: TourState;
};

export type MessageType = 'Default' | 'Error';

export type LoginCredentials = {email: string; password: string};

export type AccessCredentials = {email: string; accessKey: string};


// Tour.
export type Position = {
	x: number;
	y: number;
	z: number;
};


export const nodeFileTypes = ['Text', 'Image'] as const;

export type NodeFileType = typeof nodeFileTypes[number];

export type NodeFile = {
	type: NodeFileType;
	url?: string;
	text?: string;
};


export const nodeTypes = ['Information', 'Navigation'] as const;

export type NodeType = typeof nodeTypes[number];

export type Node = {
	type: NodeType;
	position: Position;
	panorama?: string;
	imageUrl?: string;
	article?: string;
};

export const defaultInformationNode: Node = {type: 'Information',
	position: {x: 0, y: 0, z: 0}, imageUrl: '', article: ''};

export const defaultNavigationNode: Node = {type: 'Navigation',
	position: {x: 0, y: 0, z: 0}, panorama: ''};


export type Rotation = {
	x: number;
	y: number;
};

export type Panorama = {
	image: string;
	defaultRotation: Rotation;
	nodes: Record<string, Node>;
};


export type Tour = {
	name: string;
	authors: string[];
	panoramas: Record<string, Panorama>;
	defaultPanorama: string;
};


// Requests.
export type SecuredRequest = {accessCredentials: AccessCredentials};

export type SignUpRequest = {
	loginCredentials: LoginCredentials;
	name: string;
};

export type GetUserDataRequest = SecuredRequest & {email?: string};

export type ValidateUserRequest = SecuredRequest & {validationKey: string};

export type GetTourRequest = {
	accessCredentials?: AccessCredentials;
	id?: string;
};

export type AddTourRequest = SecuredRequest & {tour: Tour};

export type SaveTourRequest = SecuredRequest & {
	id: string;
	tour: Tour;
};

export type ConnectionRequest = SecuredRequest & {email: string};


// API.
export class ApiError extends Error {
	public statusCode: number;

	public constructor(message: string, statusCode = 400){
		super(message);
		this.statusCode = statusCode;
	}
}

export type DatabaseHash = {
	hash: MongoDB.Binary;
	salt: MongoDB.Binary;
};

export type Hash = {
	hash: Buffer;
	salt: Buffer;
};


export type TourEntry = {
	id: string;
	name: string;
};

export type Connection = {
	email: string;
	name: string;
};


export type UserData = {
	name: string;
	tours: TourEntry[];
	connections: Connection[];
};

export const defaultUserData: UserData = {
	name: '',
	tours: [],
	connections: []
};


export type User = {
	_id: MongoDB.ObjectID;
	email: string;
	name: string;
	passwordHash: DatabaseHash;
	creationDate: Date;
	validationKey: string | null;
	accessKey: string;
	tours: TourEntry[];
	connections: Connection[];
};


export type TourInformation = {
	name: string;
	authors: string[];
	defaultPanorama: string;
};

export type PanoramaInformation = {
	image: string;
	defaultRotation: Rotation;
};

export type NodeInformation = {
	type: NodeType;
	position: Position;
	panorama?: string;
	imageUrl?: string;
	article?: string;
};
