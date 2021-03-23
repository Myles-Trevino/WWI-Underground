/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiRequest, NextApiResponse} from 'next/types';
import Joi from 'joi';
import {v4 as uuidv4} from 'uuid';

import type * as Types from '../../common/types';
import * as ApiHelpers from '../../api/helpers';
import * as Validation from '../../api/validation';
import * as Database from '../../api/database';
import * as Tour from '../../api/tour';


export default async function setTour(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(
			Joi.object({tour: Validation.tourSchema.required()}));

		const body = Validation.validate(request.body, schema) as Types.AddTourRequest;

		// Save the tour.
		const user = await Database.getUser(body.accessCredentials);
		const id = uuidv4();
		Tour.save(id, body.tour);

		// Add the tour to the user's account.
		const users = await Database.getUsers();
		user.tours.unshift({id, name: body.tour.name});
		await users.updateOne({_id: user._id}, {$set: {tours: user.tours}});
		response.status(200).json(user.tours);
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
