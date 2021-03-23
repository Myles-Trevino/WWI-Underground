/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';

import * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';
import * as Cryptography from '../../api/cryptography';


export default async function logIn(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const body = Validation.validate(request.body,
			Validation.loginCredentialsSchema) as Types.LoginCredentials;

		// Check that the password hash matches.
		const user = await Database.getUserUnsecured(body.email, false);
		const passwordHash = Cryptography.hashPassword(
			body.password, user.passwordHash.salt.buffer);

		if(!passwordHash.hash.equals(user.passwordHash.hash.buffer))
			throw new Types.ApiError('Invalid password.');

		// Update the access key.
		const accessKey = Cryptography.generateRandomString();
		const users = await Database.getUsers();
		users.updateOne({_id: user._id}, {$set: {accessKey}});
		response.status(200).send(accessKey);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
