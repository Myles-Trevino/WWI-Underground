/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Link from 'next/link';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import {Formik, Field, Form} from 'formik';

import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Navbar from '../components/common/navbar/navbar';


type FormValues = {validationKey: string};

const initialFormValues: FormValues = {validationKey: ''};


export default function Validate(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();
	const [validated, setValidated] = useState(false);


	// Initializer.
	useEffect(() => {

		// If the access credentials have not been cached, redirect to the login page.
		if(!state.app.accessCredentials) router.push('/login');

		// Otherwise send the validation email.
		else sendValidationEmail();
	}, []);


	// Sends the validation email.
	async function sendValidationEmail(): Promise<void> {

		try {
			await Axios.post(`api/send-validation-email`, state.app.accessCredentials);
			state.app.setMessage('Email sent.');
		}

		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Attempts to validate the user with the given validation key.
	async function validate(values: FormValues): Promise<void> {

		try {
			await Axios.patch(`api/validate-user`, {
				accessCredentials: state.app.accessCredentials,
				validationKey: values.validationKey
			});

			setValidated(true);
		}

		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Render.
	const validateTile =
		<Formik initialValues={initialFormValues} onSubmit={validate}>
			<Form className="content tile">
				<h2>Validate</h2>

				<p>
					One more step before you can use your account! To confirm that you own this email address, we&apos;ve sent you an email containing a validation key. Please enter the key below.
				</p>

				<Field name="validationKey" type="text" placeholder="Validation Key"/>

				<div className="buttonContainer">
					<button type="button" onClick={sendValidationEmail}>Resend</button>
					<button type="submit">Validate</button>
				</div>
			</Form>
		</Formik>;


	const successTile =
		<div className="content tile">
			<h2>Success</h2>

			<p>
				Congratulations! Your account is ready to use. You can now log in to WWI Underground. If you need help, click the &apos;Help&apos; button in the top right menu.
			</p>

			<div className="buttonContainer">
				<Link href="/login"><button>Log In</button></Link>
			</div>
		</div>;


	return (<>

		{/* Head. */}
		<Head>
			<title>Validate - {Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar color="var(--tile-color)"/>

		{/* Introduction. */}
		{state.app.accessCredentials && <div className="centerer">
			{validated ? successTile : validateTile}
		</div>}
	</>);
}
