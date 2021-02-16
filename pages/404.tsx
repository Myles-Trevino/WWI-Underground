/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Constants from '../common/constants';
import Styles from './404.module.scss';
import Navbar from '../components/common/navbar/navbar';


export default function NotFound(): JSX.Element {

	const router = useRouter();
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			if(countdown > 1) setCountdown(countdown-1);
			else router.push('/');
		}, 1000);

		return (): void => { clearInterval(interval); };
	});

	// One-time initialization.
	return (<>

		{/* Head. */}
		<Head>
			<title>404 - {Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar></Navbar>

		{/* Introduction. */}
		<div className={Styles.container}>
			<h2>Not Found</h2>
			<span>Redirecting in {countdown} seconds...</span>
		</div>

	</>);
}
