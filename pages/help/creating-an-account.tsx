/*
	Copyright Chris Dunphy and Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Head from 'next/head';
import Constants from '../../common/constants';


export default function Help(): JSX.Element {

	// Render.
	return (<>

		{/* Head. */}
		<Head>
			<title>Creating an Account - Help - {Constants.websiteName}</title>
		</Head>

		{/* Content. */}
		<div className="articleContainer">
			<div className="articleSection">

				<h2>Creating an Account</h2>

				<p>
					To create an account, visit the <a href="/signup" target="_blank">Signup</a> page. After filling in the required information, you&apos;ll receive an email from us with a validation code. If you don&apos;t see the message, try checking your spam folder or waiting a few minutes. You can also resend the validation email by pressing the &quot;Resend&quot; button.<br/><br/>

					When you&apos;ve recieved your code, enter it into the input on this website and press &quot;Validate&quot; to validate your account. You can then log in to your account on the <a href="/login" target="_blank">Login</a> page.
				</p>

			</div>
		</div>
	</>);
}
