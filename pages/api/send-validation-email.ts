/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';

import type * as Types from '../../common/types';
import * as ApiTypes from '../../api/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';


export default async function sendValidationEmail(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const body = request.body as Partial<Types.AccessCredentials>;
		const {email, accessKey} = Validation.accessCredentials(body);

		// Make sure the user has not already been validated.
		const user = await Database.getUser(email, accessKey, false);
		if(!user.validationKey) throw new ApiTypes.ApiError('Already validated.', 409);

		// Send the email.
		ApiHelpers.sendEmail('validation.html', 'Welcome to WWI Underground',
			user.email, {accountValidationKey: user.validationKey});

		response.status(200).end();
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
