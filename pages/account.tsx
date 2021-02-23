/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Constants from '../common/constants';
import StateContext from '../common/state/state-context';
import Navbar from '../components/common/navbar/navbar';

export default function Account(): JSX.Element {

	const state = useContext(StateContext);
	const router = useRouter();


	// If there is no user data, redirect to the login page.
	useEffect(() => { if(!state.app.userData) router.push('/login'); }, []);


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Account - {Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar/>

		{/* Account information. */}
		{state.app.userData && <div className="centerer">
			<div className="content tile">
				<h2>Account</h2>
				<span>Name: {state.app.userData.name}</span>
				<span>Email: {state.app.accessCredentials?.email}</span>
			</div>
		</div>}

	</>);
}
