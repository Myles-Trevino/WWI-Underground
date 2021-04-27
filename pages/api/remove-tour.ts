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
import * as Tour from '../../api/tour';


export default async function removeTour(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({id: Validation.idSchema.required()}));

		const body = Validation.validate(request.body, schema) as Types.RemoveTourRequest;

		// Remove the tour from the user's account.
		const user = await Database.getUser(body.accessCredentials);
		const tours = user.tours;
		tours.splice(tours.findIndex((e) => body.id === e.id), 1);

		const users = await Database.getUsers();
		await users.updateOne({_id: user._id}, {$set: {tours}});

		Tour.remove(body.id);
		response.status(200).json(tours);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
