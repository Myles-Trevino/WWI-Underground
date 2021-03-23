/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import Joi from 'joi';

import * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';


export default async function validateUser(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({validationKey: Validation.keySchema}));

		const body = Validation.validate(request.body, schema) as Types.ValidateUserRequest;

		// Make sure the user has not already been validated.
		const user = await Database.getUser(body.accessCredentials, false);
		if(!user.validationKey) throw new Types.ApiError('Already validated.', 409);

		// Check that the validation key matches.
		if(body.validationKey !== user.validationKey)
			throw new Types.ApiError('Incorrect validation key.');

		// Validate the account.
		const users = await Database.getUsers();
		users.updateOne({_id: user._id}, {$set: {validationKey: null}});
		response.status(200).end();
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
