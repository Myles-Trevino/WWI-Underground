/**
 * Copyright Chris Dunphy
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import Navbar from '../../components/common/navbar/navbar';
import Head from 'next/head';
import Style from './docs.module.scss';


export default function Help(): JSX.Element {
	return (<>
		<Head>
			<title>Test Doc</title>
		</Head>
		<Navbar></Navbar>
		<br/><br/>
		<div className = {Style.helpDocHeading}>
			<h1>Making an account:</h1>
			<br/>
			<div className = {Style.helpDocText}>
				<p>To create an account, first visit the Log In page. Then, click Sign Up to change the log in window to a sign up window.</p>
				<p>After filling in the required information, you'll receive an email from support@wwi-underground.com with a verification code. Enter the code into the window on this website
					and your account is confirmed! Enjoy your stay.
				</p>
			</div>
		</div>
	</>);
}
