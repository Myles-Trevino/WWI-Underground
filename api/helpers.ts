/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import type {NextApiResponse} from 'next/types';
import FS from 'fs';
import Nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

import type * as Types from '../common/types';
import Constants from '../common/constants';


// Sends an error response.
export function errorStatus(response: NextApiResponse, error: unknown): void {

	const apiError = error as Types.ApiError;
	const status = apiError.statusCode ? apiError.statusCode : 500;

	if(status === 500){
		console.error(error);
		response.status(status).end();
	}

	else response.status(status).send(apiError.message);
}


// Sends an email.
export function sendEmail(templateName: string, subject: string,
	emailAddress: string, context: Record<string, unknown>): void {

	// Load the email.
	const emailHtml = Handlebars.compile(FS.readFileSync(
		`api/email-templates/${templateName}`, 'utf-8'))(context);

	// Configure Nodemailer.
	if(!process.env.EMAIL_HOST || !process.env.EMAIL_PORT ||
		!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD)
		throw new Error('Missing email environment variables.');

	const transporter = Nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number.parseInt(process.env.EMAIL_PORT),
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
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
