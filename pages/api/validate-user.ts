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


type ValidateUserBody = {
	accessCredentials?: Partial<Types.AccessCredentials>;
	validationKey?: string;
};


export default async function validateUser(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const body = request.body as ValidateUserBody;
		const {email, accessKey} = Validation.accessCredentials(body.accessCredentials);
		const validationKey = Validation.key(body.validationKey);

		// Make sure the user has not already been validated.
		const user = await Database.getUser(email, accessKey, false);
		if(!user.validationKey) throw new ApiTypes.ApiError('Already validated.', 409);

		// Check that the validation key matches.
		if(validationKey !== user.validationKey)
			throw new ApiTypes.ApiError('Incorrect validation key.');

		// Validate the account.
		const users = await Database.getUsers();
		users.updateOne({_id: user._id}, {$set: {validationKey: null}});
		response.status(200).end();
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
