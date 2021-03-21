/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Joi from 'joi';

import * as ApiTypes from './types';
import Constants from '../common/constants';


const nameRegex = /^[\w\s]+$/;


// Helper schemas.
export const keySchema = Joi.string().base64();

export const nameSchema = Joi.string().pattern(nameRegex);

export const emailSchema = Joi.string().email();

export const passwordSchema = Joi.string().min(Constants.minimumPasswordLength);

export const loginCredentialsSchema = Joi.object({
	email: emailSchema.required(),
	password: passwordSchema.required()
});

export const accessCredentialsSchema = Joi.object({
	email: emailSchema.required(),
	accessKey: keySchema.required()
});

export const securedRequestSchema =
	Joi.object({accessCredentials: accessCredentialsSchema.required()});


// Validates the given value with the given schema.
export function validate(value: unknown, schema: Joi.Schema): unknown {

	const result = schema.validate(value);

	if(result.error)
		throw new ApiTypes.ApiError(`Invalid request: ${result.error.message}.`);

	return result.value;
}
