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


export default async function isEditable(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({id: Validation.idSchema.required()}));

		const body = Validation.validate(request.body, schema) as Types.IsEditableRequest;

		// Return whether the user can edit the given tour.
		const user = await Database.getUser(body.accessCredentials);
		const editable = user.tours.some((e) => body.id === e.id);
		response.status(200).json({editable});
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
