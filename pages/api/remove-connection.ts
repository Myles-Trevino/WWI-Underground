/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import Joi from 'joi';

import type * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';


export default async function removeConnection(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({email: Validation.emailSchema.required()}));

		const body = Validation.validate(request.body, schema) as Types.ConnectionRequest;

		// Remove the connection from the user's account.
		const user = await Database.getUser(body.accessCredentials);
		const connections = user.connections;
		connections.splice(connections.findIndex((e) => body.email === e.email), 1);

		const users = await Database.getUsers();
		await users.updateOne({_id: user._id}, {$set: {connections}});

		response.status(200).json(connections);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
