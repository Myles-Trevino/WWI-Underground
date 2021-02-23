/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import * as MobX from 'mobx';
import Axios from 'axios';
import type {AxiosError} from 'axios';
import {Formik, Form, Field} from 'formik';

import type * as Types from '../common/types';
import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Navbar from '../components/common/navbar/navbar';


type FormValues = {email: string; password: string};
const initialFormValues: FormValues = {email: '', password: ''};


export default function Login(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();


	// Attempts to log the user in.
	async function logIn(values: FormValues): Promise<void> {

		try {

			// Log in.
			const accessKey = (await Axios.patch<string>(
				`api/log-in`, {email: values.email, password: values.password})).data;

			state.app.setAccessCredentials({email: values.email, accessKey});

			// Get the user data.
			const userData = (await Axios.post<Types.UserData>(
				`api/get-user-data`, MobX.toJS(state.app.accessCredentials))).data;

			state.app.setUserData(userData);

			// Redirect to the account page.
			router.push('/account');
		}

		// Handle errors.
		catch(error: unknown){

			// If a '403 - Forbidden' error was recieved, redirect to the validation page.
			const axiosError = error as AxiosError;
			if(axiosError.response?.status === 403) router.push('/validate');

			// Otherwise, display an error message.
			else state.app.setErrorMessage(error);
		}
	}


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Login - {Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar color="var(--tile-color)"/>

		{/* Introduction. */}
		<div className="centerer">
			<Formik initialValues={initialFormValues} onSubmit={logIn}>
				<Form className="content tile">

					<h2>Log In</h2>

					<Field name="email" type="text" placeholder="Email"/>
					<Field name="password" type="password" placeholder="Password"/>

					<div className="buttonContainer">
						<Link href="/signup"><button type="button">Sign Up</button></Link>
						<button type="submit">Log In</button>
					</div>

				</Form>
			</Formik>
		</div>
	</>);
}
