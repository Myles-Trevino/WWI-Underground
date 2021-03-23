/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Link from 'next/link';
import {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Formik, Form, Field} from 'formik';
import classNames from 'classnames';
import * as _ from 'lodash';

import * as Api from '../common/api';
import * as Helpers from '../common/helpers';
import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Styles from './account.module.scss';


type FormValues = {input: string};
const initialFormValues: FormValues = {input: ''};


export default observer(function Account(){

	const state = useContext(StateContext);
	const router = useRouter();


	// Initializer.
	useEffect(() => { Helpers.automaticLogin(state, router, true); }, []);


	// Creates a tour of the given name.
	async function createTour(values: FormValues): Promise<void> {

		try {
			const tour = _.cloneDeep(await state.app.getDefaultTour(state));
			tour.name = values.input;
			if(state.app.name) tour.authors.unshift(state.app.name);
			tour.authors = _.uniq(tour.authors);

			state.app.setTours(await Api.addTour(state, tour));
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Adds the given connection.
	async function addConnection(values: FormValues): Promise<void> {
		try { state.app.setConnections(await Api.addConnection(state, values.input)); }
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Logs out.
	function logOut(): void {
		localStorage.removeItem(Constants.accessKeyKey);
		state.app.setLoggedIn(false);
		router.push('/login');
	}


	// Render.
	if(!state.app.loggedIn) return <></>;

	const connections: JSX.Element[] = [];
	for(const connection of state.app.connections) connections.push(
		<span key={connection.email} className="clickable">{connection.name}</span>);

	const tours: JSX.Element[] = [];
	for(const tour of state.app.tours) tours.push(
		<Link key={tour.id} href={`/tour?id=${tour.id}`}>
			<span className="clickable">{tour.name}</span>
		</Link>
	);

	return <>

		{/* Head. */}
		<Head>
			<title>Account - {Constants.websiteName}</title>
		</Head>

		<div className={classNames('centerer', Styles.content)}>

			<div className={Styles.leftSide}>

				{/* Information. */}
				<div className="mediumWidth gridTile">

					<div className="tileSection buttonOption">
						<h2>Account</h2>
						<button onClick={logOut}>Log Out</button>
					</div>

					<div className="solidDivider"></div>

					<div className="gridTileSection">
						<span>Name: {state.app.name}</span>
						<span>Email: {state.app.email}</span>
					</div>

				</div>

				{/* Tours. */}
				<div className={classNames(Styles.tours, 'mediumWidth gridTile')}>

					<h2 className="tileSection">Tours</h2>
					<div className="solidDivider"></div>

					<div>
						<Formik initialValues={initialFormValues} onSubmit={createTour}>
							<Form className="tileSection buttonOption">
								<Field name="input" type="text" placeholder="Name"/>
								<button type="submit">Create</button>
							</Form>
						</Formik>

						<div className="dashedDivider"></div>

						<div className={Styles.listContainer}>
							{tours.length > 0 ?

								<div className={Styles.list}>{tours}</div> :

								<div className={Styles.overlay}>
									<span className="disabled">No Tours</span>
								</div>
							}
						</div>
					</div>

				</div>

			</div>

			{/* Connections. */}
			<div className={classNames(Styles.connections, 'mediumWidth gridTile')}>

				<h2 className="tileSection">Connections</h2>

				<div className="solidDivider"></div>

				<div>
					<Formik initialValues={initialFormValues} onSubmit={addConnection}>
						<Form className="tileSection buttonOption">
							<Field name="input" type="text" placeholder="Email"/>
							<button type="submit">Add</button>
						</Form>
					</Formik>

					<div className="dashedDivider"></div>

					<div className={Styles.listContainer}>
						{connections.length > 0 ?

							<div className={Styles.list}>{connections}</div> :

							<div className={Styles.overlay}>
								<span className="disabled">No Connections</span>
							</div>
						}
					</div>
				</div>

			</div>

		</div>
	</>;
});
