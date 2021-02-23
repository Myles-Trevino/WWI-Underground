/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiResponse} from 'next/types';
import FS from 'fs';
import Nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

import type * as ApiTypes from './types';
import * as Environment from '../environment';
import Constants from '../common/constants';


// Sends an error response.
export function errorStatus(response: NextApiResponse, error: unknown): void {
	const apiError = error as ApiTypes.ApiError;
	const status = apiError.statusCode ? apiError.statusCode : 500;
	response.status(status).send(apiError.message);
	if(status === 500) console.error(error);
}


// Sends an email.
export function sendEmail(templateName: string, subject: string,
	emailAddress: string, context: Record<string, unknown>): void {

	// Load the email.
	const emailHtml = Handlebars.compile(FS.readFileSync(
		`api/email-templates/${templateName}`, 'utf-8'))(context);

	// Configure Nodemailer.
	const transporter = Nodemailer.createTransport({
		host: Environment.emailHost,
		port: Environment.emailPort,
		secure: true,
		auth: {
			user: Environment.emailUsername,
			pass: Environment.emailPassword
		}
	});

	// Send the email.
	transporter.sendMail({
		from: Constants.emailAddress,
		to: emailAddress,
		subject,
		html: emailHtml,
		attachments: [{
			filename: 'logo.png',
			path: Constants.emailLogoUrl,
			cid: 'logo'
		}]
	});
}
