/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';

import type * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';


export default async function getUserData(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const body = Validation.validate(request.body,
			Validation.securedRequestSchema) as Types.SecuredRequest;

		// Get the user data.
		const user = await Database.getUser(body.accessCredentials);

		const data: Types.UserData = {
			name: user.name,
			connections: user.connections,
			tours: user.tours
		};

		response.status(200).json(data);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
