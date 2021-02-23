/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import Constants from '../common/constants';
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


	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>404 - {Constants.websiteName}</title>
		</Head>

		{/* Navbar. */}
		<Navbar/>

		{/* Introduction. */}
		<div className="centerer">
			<div className="vertical">
				<h2>Not Found</h2>
				<span>Redirecting in {countdown} seconds</span>
			</div>
		</div>

	</>);
}
