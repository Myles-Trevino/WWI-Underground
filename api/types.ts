/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type MongoDB from 'mongodb';

import type * as Types from '../common/types';


export class ApiError extends Error {
	public statusCode: number;

	public constructor(message: string, statusCode = 400){
		super(message);
		this.statusCode = statusCode;
	}
}


export type User = {
	_id: MongoDB.ObjectID;
	email: string;
	passwordHash: DatabaseHash;
	creationDate: Date;
	validationKey: string | null;
	accessKey: string;
	data: Types.UserData;
};

export type DatabaseHash = {
	hash: MongoDB.Binary;
	salt: MongoDB.Binary;
};

export type Hash = {
	hash: Buffer;
	salt: Buffer;
};


export type SecuredRequest = {accessCredentials: Types.AccessCredentials};
