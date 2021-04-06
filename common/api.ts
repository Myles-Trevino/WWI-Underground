/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Axios from 'axios';

import type * as Types from './types';


// Connections.
export async function addConnection(state: Types.State,
	email: string): Promise<Types.Connection[]> {

	const data: Types.ConnectionRequest = {email,
		accessCredentials: state.app.getAccessCredentials()};

	return (await Axios.post<Types.Connection[]>('api/add-connection', data)).data;
}


export async function removeConnection(state: Types.State,
	email: string): Promise<Types.Connection[]> {

	const data: Types.ConnectionRequest = {email,
		accessCredentials: state.app.getAccessCredentials()};

	return (await Axios.post<Types.Connection[]>('api/add-connection', data)).data;
}


// Tours.
export async function getTour(state?: Types.State, id?: string): Promise<Types.Tour> {

	const data: Types.GetTourRequest = {id,
		accessCredentials: state?.app.getAccessCredentials()};

	return (await Axios.post<Types.Tour>('api/get-tour', data)).data;
}


export async function addTour(state: Types.State,
	tour: Types.Tour): Promise<Types.TourEntry[]> {

	const data: Types.AddTourRequest = {tour,
		accessCredentials: state.app.getAccessCredentials()};

	return (await Axios.post<Types.TourEntry[]>(`api/add-tour`, data)).data;
}


export async function saveTour(state: Types.State,
	id: string, tour: Types.Tour): Promise<void> {

	const data: Types.SaveTourRequest = {id, tour,
		accessCredentials: state.app.getAccessCredentials()};

	await Axios.post(`api/save-tour`, data);
}


// Account.
export async function signUp(data: Types.SignUpRequest): Promise<string> {
	return (await Axios.post<string>(`api/sign-up`, data)).data;
}


export async function sendValidationEmail(state: Types.State): Promise<void> {

	const data: Types.SecuredRequest =
		{accessCredentials: state.app.getAccessCredentials()};

	await Axios.post(`api/send-validation-email`, data);
}


export async function validateUser(state: Types.State,
	validationKey: string): Promise<void> {

	const data: Types.ValidateUserRequest = {validationKey,
		accessCredentials: state.app.getAccessCredentials()};

	await Axios.post(`api/validate-user`, data);
}


export async function logIn(data: Types.LoginCredentials): Promise<string> {
	return (await Axios.post<string>(`api/log-in`, data)).data;
}


export async function getUserData(state: Types.State,
	email?: string): Promise<Types.UserData> {

	const data: Types.GetUserDataRequest = {email,
		accessCredentials: state.app.getAccessCredentials()};

	return (await Axios.post<Types.UserData>(`api/get-user-data`, data)).data;
}
