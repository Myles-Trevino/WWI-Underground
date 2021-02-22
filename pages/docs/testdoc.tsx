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
			<h1>Test</h1>
		</div>
		<br/>
		<div className = {Style.helpDocText}>
			<p>This is the body of a generic help doc</p>
		</div>
		<div className = {Style.helpDocHeading}>
			<h1>Test heading two:</h1>
		</div>
		<div className = {Style.helpDocText}>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</>);
}
