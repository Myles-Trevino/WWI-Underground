/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import MongoDB from 'mongodb';
import Joi from 'joi';

import * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';
import * as Cryptography from '../../api/cryptography';


export default async function signUp(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Joi.object({
			loginCredentials: Validation.loginCredentialsSchema,
			name: Validation.nameSchema
		});

		const body = Validation.validate(request.body, schema) as Types.SignUpRequest;

		// Make sure the user does not already exist.
		const users = await Database.getCollection<Types.User>('users');

		if(await users.findOne({email: body.loginCredentials.email}))
			throw new Types.ApiError('An account with '+
				'this email address already exists.', 409);

		// Add the user.
		const validationKey = Cryptography.generateRandomString();
		const accessKey = Cryptography.generateRandomString();
		const rawPasswordHash = Cryptography.hashPassword(body.loginCredentials.password);

		await users.insertOne({
			_id: new MongoDB.ObjectID(),
			email: body.loginCredentials.email,
			name: body.name,
			passwordHash: {
				hash: new MongoDB.Binary(rawPasswordHash.hash),
				salt: new MongoDB.Binary(rawPasswordHash.salt)
			},
			creationDate: new Date(),
			validationKey,
			accessKey,
			tours: [],
			connections: []
		});

		response.status(200).send(accessKey);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
