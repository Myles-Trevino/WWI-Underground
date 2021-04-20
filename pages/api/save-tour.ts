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
import * as Tour from '../../api/tour';


export default async function setTour(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const schema = Validation.securedRequestSchema.concat(Joi.object({
			id: Validation.idSchema.required(),
			tour: Validation.tourSchema.required()
		}));

		const body = Validation.validate(request.body, schema) as Types.SaveTourRequest;

		// Disallow saving tours that are not associated with the user.
		const user = await Database.getUser(body.accessCredentials);
		if(!user.tours.some((e) => body.id === e.id))
			throw new Types.ApiError('You do not have permission to edit this tour. '+
				'Please create your own tour on the account page to save changes.');

		// Save the tour.
		Tour.save(body.id, body.tour);
		response.status(200).end();
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
