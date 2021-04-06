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


export default async function getUserData(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({email: Validation.emailSchema}));

		const body = Validation.validate(request.body, schema) as Types.GetUserDataRequest;

		// Get the data of the user making the request.
		const user = await Database.getUser(body.accessCredentials);
		let requestedUser: Types.User | undefined = undefined;
		if(!body.email || body.email === user.email) requestedUser = user;

		// If another user's data is being requested, check that
		// the requesting user has added them as a connection.
		else {
			if(!user.connections.find((e) => e.email === body.email))
				throw new Types.ApiError('The requested user is not in your connections.');

			requestedUser = await Database.getUserUnsecured(body.email);
		}

		const data: Types.UserData = {
			name: requestedUser.name,
			connections: requestedUser.connections,
			tours: requestedUser.tours
		};

		response.status(200).json(data);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
