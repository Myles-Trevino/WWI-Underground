/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Formik, Form, Field} from 'formik';

import * as Helpers from '../common/helpers';
import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Styles from './account.module.scss';


type FormValues = {input: string};
const initialFormValues: FormValues = {input: ''};


export default function Account(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();


	// Initializer.
	useEffect(() => { initialize(); }, []);

	async function initialize(): Promise<void> {

		try {
			// Load cached credentials.
			const cachedEmailAddress = localStorage.getItem(Constants.emailKey);
			const cachedAccessKey = localStorage.getItem(Constants.accessKeyKey);
			if(!cachedEmailAddress || !cachedAccessKey) throw new Error();

			state.app.setAccessCredentials({
				email: cachedEmailAddress,
				accessKey: cachedAccessKey
			});

			// Load the user data.
			await Helpers.loadUserData(state, router);

			// Redirect to the account page.
			router.push('/account');
		}

		// Handle errors.
		catch(error: unknown){ router.push('/login'); }
	}


	// Adds the given connection.
	function addConnection(values: FormValues): void {
		console.log(values);
	}


	// Logs out.
	function logOut(): void {
		localStorage.removeItem(Constants.accessKeyKey);
		router.push('/login');
	}


	// Render.
	if(!state.app.userData) return (<></>);

	const connections: JSX.Element[] = [];
	for(const connection of state.app.userData.connections){
		connections.push(<>
			<span>{connection.status}</span>
		</>);
	}

	const tours: JSX.Element[] = [];
	for(const tour of state.app.userData.tours){
		connections.push(<>
			<span>{tour.name} - {tour.id}</span>
		</>);
	}

	return (<>

		{/* Head. */}
		<Head>
			<title>Account - {Constants.websiteName}</title>
		</Head>

		<div className="centerer">

			{/* Information. */}
			<div className="mediumWidth gridTile">

				<div className="tileSection buttonOption">
					<h2>Account</h2>
					<button onClick={logOut}>Log Out</button>
				</div>

				<div className="solidDivider"></div>

				<div className="gridTileSection">
					<span>Name: {state.app.userData.name}</span>
					<span>Email: {state.app.accessCredentials?.email}</span>
				</div>

			</div>

			{/* Connections. */}
			<div className="mediumWidth gridTile">

				<h2 className="tileSection">Connections</h2>

				<div className="solidDivider"></div>

				<Formik initialValues={initialFormValues} onSubmit={addConnection}>
					<Form className="tileSection buttonOption">
						<Field name="email" type="text" placeholder="Email"/>
						<button type="submit">Add</button>
					</Form>
				</Formik>

				<div className="dashedDivider"></div>

				{connections.length > 0 ? connections :
					<div className={Styles.overlay}>
						<span className="disabled">No Connections</span>
					</div>
				}

			</div>

			{/* Connections. */}
			<div className="mediumWidth gridTile">

				<h2 className="tileSection">Tours</h2>
				<div className="solidDivider"></div>

				<div className={Styles.list}>
					{tours.length > 0 ? tours :
						<div className={Styles.overlay}>
							<span className="disabled">No Tours</span>
						</div>
					}
				</div>

			</div>

		</div>
	</>);
}
