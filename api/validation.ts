/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Validator from 'validator';

import type * as Types from '../common/types';
import * as ApiTypes from './types';
import Constants from '../common/constants';


// Validates the format of the given email.
export function email(value?: string): string {
	if(!value) throw new ApiTypes.ApiError('No email provided.');
	if(!Validator.isEmail(value)) throw new ApiTypes.ApiError('Invalid email.');
	return value;
}


// Validates the format of the given password.
export function password(value?: string): string {
	if(!value) throw new ApiTypes.ApiError('No password provided.');
	if(value.length < Constants.minimumPasswordLength) throw new ApiTypes.ApiError(
		`The password must be at least ${Constants.minimumPasswordLength} characters.`);
	return value;
}


// Validates the format of the given base-64 key.
export function key(value?: string): string {
	if(!value) throw new ApiTypes.ApiError('No key provided.');
	if(!Validator.isBase64(value)) throw new ApiTypes.ApiError('Invalid key.');
	return value;
}


// Validates the format of the given login credentials.
export function loginCredentials(
	value?: Partial<Types.LoginCredentials>): Types.LoginCredentials {
	if(!value) throw new ApiTypes.ApiError('No login credentials provided.');
	return {email: email(value.email), password: password(value.password)};
}


// Validates the format of the given access credentials.
export function accessCredentials(
	value?: Partial<Types.AccessCredentials>): Types.AccessCredentials {
	if(!value) throw new ApiTypes.ApiError('No access credentials provided.');
	return {email: email(value.email), accessKey: key(value.accessKey)};
}


// Validates the format of the given user data.
export function userData(value?: Partial<Types.UserData>): Types.UserData {
	if(!value) throw new ApiTypes.ApiError('No user data provided.');
	if(!value.name) throw new ApiTypes.ApiError('No access name provided.');
	if(!Validator.isAlphanumeric(value.name))
		throw new ApiTypes.ApiError('Invalid name.');
	return {name: value.name};
}


// Validates the format of the given name.
export function name(value?: string): string {
	if(!value) throw new ApiTypes.ApiError('No name provided.');
	if(value.length < Constants.minimumNameLength) throw new ApiTypes.ApiError(
		`Your name must be at least ${Constants.minimumNameLength} characters.`);
	return value;
}
