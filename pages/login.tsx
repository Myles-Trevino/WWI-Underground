/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import {Formik, Form, Field} from 'formik';

import * as Helpers from '../common/helpers';
import Constants from '../common/constants';
import StateContext from '../common/state/state-context';


type FormValues = {email: string; password: string};
const initialFormValues: FormValues = {email: '', password: ''};


export default function Login(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();
	const [initialized, setInitialized] = useState(false);


	// Initializer.
	useEffect(() => {
		const cachedEmailAddress = localStorage.getItem(Constants.emailKey);
		if(cachedEmailAddress) initialFormValues.email = cachedEmailAddress;
		setInitialized(true);
	}, []);


	// Attempts to log the user in.
	async function logIn(values: FormValues): Promise<void> {

		try {
			// Log in.
			const accessKey = (await Axios.patch<string>(
				`api/log-in`, {email: values.email, password: values.password})).data;

			state.app.setAccessCredentials({email: values.email, accessKey});

			// Load the user data.
			await Helpers.loadUserData(state, router);

			// Cache the access credentials.
			localStorage.setItem(Constants.emailKey, values.email);
			localStorage.setItem(Constants.accessKeyKey, accessKey);

			// Redirect to the account page.
			router.push('/account');
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Render.
	if(!initialized) return <></>;

	return <>

		{/* Head. */}
		<Head>
			<title>Login - {Constants.websiteName}</title>
		</Head>

		{/* Introduction. */}
		<div className="centerer">
			<Formik initialValues={initialFormValues} onSubmit={logIn}>
				<Form className="mediumWidth gridTile">

					<h2 className="tileSection">Log In</h2>
					<div className="solidDivider"></div>

					<div className="gridTileSection">
						<Field name="email" type="text" placeholder="Email"/>
						<Field name="password" type="password" placeholder="Password"/>

						<div className="buttonContainer">
							<Link href="/signup"><button type="button">Sign Up</button></Link>
							<button type="submit">Log In</button>
						</div>
					</div>

				</Form>
			</Formik>
		</div>
	</>;
}
