/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Joi from 'joi';

import * as Types from '../common/types';
import Constants from '../common/constants';


const nameRegex = /^[\w\s]+$/;

const pathRegex = /^[\da-z-/]+$/;


// Schemas.
export const keySchema = Joi.string().base64();

export const idSchema = Joi.string().uuid();

export const nameSchema = Joi.string().pattern(nameRegex);

export const pathSchema = Joi.string().pattern(pathRegex);

export const uriSchema = Joi.string().uri();

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


// User data schema.
export const connectionSchema = Joi.object({
	email: emailSchema.required(),
	name: nameSchema.required()
});

export const tourEntrySchema = Joi.object({
	id: idSchema.required(),
	name: nameSchema.required()
});

export const userDataSchema = Joi.object({
	name: nameSchema.required(),
	tours: Joi.array().items(tourEntrySchema).required(),
	connections: Joi.array().items(connectionSchema).required()
});


// Tour schema.
export const positionSchema = Joi.object({
	x: Joi.number(),
	y: Joi.number(),
	z: Joi.number()
});

export const rotationSchema = Joi.object({
	x: Joi.number(),
	y: Joi.number()
});

export const nodeFileSchema = Joi.object({
	type: Joi.string().valid(...Types.nodeFileTypes).required(),
	url: pathSchema,
	text: Joi.string()
});

export const nodeSchema = Joi.object({
	type: Joi.string().valid(...Types.nodeTypes).required(),
	position: positionSchema.required(),
	panorama: nameSchema.allow(''),
	imageUrl: uriSchema.allow(''),
	article: Joi.string().allow('')
});

export const panoramaSchema = Joi.object({
	image: pathSchema.required(),
	defaultRotation: rotationSchema.required(),
	nodes: Joi.object().pattern(nameSchema, nodeSchema).required()
});

export const featuredNodeSchema = Joi.object({
	name: nameSchema.allow('').required(),
	panorama: nameSchema.allow('').required()
});

export const tourSchema = Joi.object({
	name: nameSchema.required(),
	authors: Joi.array().items(nameSchema).required(),
	panoramas: Joi.object().pattern(nameSchema, panoramaSchema).required(),
	defaultPanorama: nameSchema.required(),
	featuredNodes: Joi.array().items(featuredNodeSchema).required()
});


// Validates the given value with the given schema.
export function validate(value: unknown, schema: Joi.Schema): unknown {

	const result = schema.validate(value);

	if(result.error)
		throw new Types.ApiError(`Invalid request: ${result.error.message}.`);

	return result.value;
}
