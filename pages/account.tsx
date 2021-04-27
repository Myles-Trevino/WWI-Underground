/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import Head from 'next/head';
import type {FormikHelpers} from 'formik';
import {Formik, Form, Field} from 'formik';
import classNames from 'classnames';
import * as _ from 'lodash';

import type * as Types from '../common/types';
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
	const [connectionTours, setConnectionTours] =
		useState<Types.TourEntry[] | undefined>();


	// Initializer.
	useEffect(() => { Helpers.automaticLogin(state, router, true); }, []);


	// Creates a tour of the given name.
	async function createTour(values: FormValues,
		actions: FormikHelpers<FormValues>): Promise<void> {

		try {
			const tour = _.cloneDeep(await state.app.getDefaultTour(state));
			tour.name = values.input;
			if(state.app.name) tour.authors.unshift(state.app.name);
			tour.authors = _.uniq(tour.authors);

			state.app.setTours(await Api.addTour(state, tour));
			actions.resetForm();
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Adds the given connection.
	async function addConnection(values: FormValues,
		actions: FormikHelpers<FormValues>): Promise<void> {

		try {
			state.app.setConnections(await Api.addConnection(state, values.input));
			actions.resetForm();
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Logs out.
	function logOut(): void {
		localStorage.removeItem(Constants.accessKeyKey);
		state.app.setLoggedIn(false);
		router.push('/login');
	}


	// Views the given connection's tours.
	async function viewConnection(email: string): Promise<void> {
		try {
			const userData = await Api.getUserData(state, email);
			setConnectionTours(userData.tours);
		}

		// Handle errors.
		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Close connection popup.
	function closeConnectionToursPopup(): void { setConnectionTours(undefined); }


	// Creates a link element to the given tour.
	function createTourLink(tour: Types.TourEntry, removeButton = false): JSX.Element {
		return <Link key={tour.id} href={`/tour?id=${tour.id}`}>
			<div className={classNames('clickable', Styles.listEntry)}>

				<span>{tour.name}</span>

				{removeButton && <button onClick={async (event): Promise<void> => { event.stopPropagation(); state.app.setTours(await Api.removeTour(state, tour.id)); }}>Remove</button>}

			</div>
		</Link>;
	}


	// Render.
	if(!state.app.loggedIn) return <></>;

	const connections: JSX.Element[] = [];
	for(const connection of state.app.connections) connections.push(
		<div key={connection.email} className={classNames('clickable', Styles.listEntry)} onClick={(): void => { viewConnection(connection.email); }}>

			<span>{connection.name}</span>

			<button onClick={async (event): Promise<void> => { event.stopPropagation(); state.app.setConnections(await Api.removeConnection(state, connection.email)); }}>Remove</button>

		</div>
	);

	const tours: JSX.Element[] = [];
	for(const tour of state.app.tours) tours.push(createTourLink(tour, true));

	const connectionToursList: JSX.Element[] = [];
	if(connectionTours)
		for(const tour of connectionTours) connectionToursList.push(createTourLink(tour));

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
							{(tours.length > 0) ?

								<div className={Styles.list}>{tours}</div> :

								<div className={Styles.emptyList}>
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
						{(connections.length > 0) ?

							<div className={Styles.list}>{connections}</div> :

							<div className={Styles.emptyList}>
								<span className="disabled">No Connections</span>
							</div>
						}
					</div>
				</div>

			</div>
		</div>

		{/* Connection tours popup. */}
		{(connectionTours !== undefined) && <div className="overlay" onClick={closeConnectionToursPopup}>
			<div className={classNames(Styles.connectionToursPopup, 'mediumWidth gridTile')}>

				<h2 className="tileSection">Connection Tours</h2>

				<div>
					<div className="solidDivider"></div>

					<div className={Styles.listContainer}>
						{(connectionTours.length > 0) ?

							<div className={Styles.list}>{connectionToursList}</div> :

							<div className={Styles.emptyList}>
								<span className="disabled">No Tours</span>
							</div>
						}
					</div>
				</div>

			</div>
		</div>}
	</>;
});
