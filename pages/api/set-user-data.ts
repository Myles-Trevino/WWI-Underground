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


type SetUserDataBody = {
	accessCredentials?: Partial<Types.AccessCredentials>;
	userData?: Partial<Types.UserData>;
};


export default async function setUserData(request: NextApiRequest,
	response: NextApiResponse): Promise<void> {

	try {
		// Validate the body.
		const body = request.body as SetUserDataBody;
		const {email, accessKey} = Validation.accessCredentials(body.accessCredentials);
		const userData = Validation.userData(body.userData);

		// Set the user data.
		const user = await Database.getUser(email, accessKey);
		const users = await Database.getUsers();
		users.updateOne({_id: user._id}, {$set: {userData}});
		response.status(200).end();
	}

	// Handle errors.
	catch(error: unknown){ ApiHelpers.errorStatus(response, error); }
}
