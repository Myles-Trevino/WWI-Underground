/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import Axios from 'axios';
import {Formik, Field, Form} from 'formik';

import Constants from '../common/constants';
import StateContext from '../common/state/state-context';


type FormValues = {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
};

const initialFormValues: FormValues = {
	email: '',
	name: '',
	password: '',
	confirmPassword: ''
};


export default function Signup(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();

	async function signUp(values: FormValues): Promise<void> {
		try {

			// Make sure the passwords match.
			if(values.password !== values.confirmPassword)
				throw new Error('Passwords do not match.');

			// Send the add user request.
			const loginCredentials = {email: values.email, password: values.password};
			const accessKey = (await Axios.put<string>(`api/sign-up`,
				{loginCredentials, name: values.name})).data;

			// Update the access credentials.
			state.app.setAccessCredentials({email: values.email, accessKey});

			// Redirect to the validation page.
			router.push('/validate');
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Sign Up - {Constants.websiteName}</title>
		</Head>

		{/* Introduction. */}
		<div className="centerer">
			<Formik initialValues={initialFormValues} onSubmit={signUp}>
				<Form className="content tile">
					<h2>Sign Up</h2>

					<Field name="email" type="text" placeholder="Email"/>
					<Field name="name" type="text" placeholder="Name"/>
					<Field name="password" type="password" placeholder="Password"/>
					<Field name="confirmPassword" type="password" placeholder="Confirm Password"/>

					<div className="buttonContainer">
						<button type="submit">Continue</button>
					</div>
				</Form>
			</Formik>
		</div>
	</>);
}
