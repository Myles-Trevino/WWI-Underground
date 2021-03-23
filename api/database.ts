/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import MongoDB from 'mongodb';

import * as Types from '../common/types';


let database: MongoDB.Db | undefined = undefined;


// Retrieves the database.
export async function getDatabase(): Promise<MongoDB.Db> {

	if(!database){
		if(!process.env.MONGODB_URI) throw new Error('No MongoDB URI.');

		database = (await MongoDB.MongoClient.connect(
			process.env.MONGODB_URI, {useUnifiedTopology: true})).db();
	}

	return database;
}


// Retrieves the collection of the specified name.
export async function getCollection<T>(name: string): Promise<MongoDB.Collection<T>> {
	return (await getDatabase()).collection(name);
}


// Retrieves the users collection.
export async function getUsers(): Promise<MongoDB.Collection<Types.User>> {
	return await getCollection('users');
}


// Returns the user that matches the given email,
// optionally checking if the user is validated.
export async function getUserUnsecured(email: string,
	checkValidation = true): Promise<Types.User> {

	const users = await getUsers();
	const user = await users.findOne({email});

	if(!user) throw new Types.ApiError('No user exists with this email.');

	if(checkValidation && user.validationKey)
		throw new Types.ApiError('Not validated.', 403);

	return user;
}


// Returns the user that matches the given email, checking that the access key matches
// and optionally checking if the user is validated.
export async function getUser(accessCredentials: Types.AccessCredentials,
	checkValidation = true): Promise<Types.User> {

	const user = await getUserUnsecured(accessCredentials.email, checkValidation);

	if(accessCredentials.accessKey !== user.accessKey)
		throw new Types.ApiError('Invalid access key.');

	return user;
}
