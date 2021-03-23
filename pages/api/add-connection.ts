/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import * as _ from 'lodash';

import * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';


export default async function addConnection(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.connectionRequestSchema;
		const body = Validation.validate(request.body, schema) as Types.ConnectionRequest;

		// Add the connection if it has not already been added.
		const user = await Database.getUser(body.accessCredentials);
		const users = await Database.getUsers();
		const connections = user.connections;

		if(user.email === body.email)
			throw new Types.ApiError('You cannot add yourself as a connection.');

		if(_.has(connections, body.email))
			throw new Types.ApiError('This connection has already been added.');

		const requestedUser = await Database.getUserUnsecured(body.email);
		connections.push({email: body.email, name: requestedUser.name});
		await users.updateOne({_id: user._id}, {$set: {connections}});

		response.status(200).json(connections);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
