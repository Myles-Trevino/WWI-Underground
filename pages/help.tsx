/**
 *  Copyright Chris Dunphy
 * 	Licensed under the Apache License, Version 2.0
 * 	http://www.apache.org/licenses/LICENSE-2.0
 */

import Navbar from '../components/common/navbar/navbar';
import Head from 'next/head';
import Styles from './help.module.scss';
import Link from 'next/link';

export default function Help(): JSX.Element {
	return (<>
		<Head>
			<title>Help</title>
		</Head>
		<Navbar></Navbar>
		<div className = {Styles.container}>
			<h1>Help and Documentation</h1>
		</div>
		<br/>
		<div className = {Styles.helpHeadings}>
			<h2>First Steps</h2>
			<div className = {Styles.helpLink}>
				<p><Link href = "/docs/tour">Tour, Map, and Further Exploration</Link></p>
			</div>
			<div className = {Styles.helpLink}>
				<p>Creating an Account</p>
			</div>
		</div>
		<div className = {Styles.helpHeadings}>
			<h2>Editing and Collaboration</h2>
			<div className = {Styles.helpLink}>
				<p><Link href = "docs/editing">Editing the Cave Tour</Link></p>
			</div>
		</div>

	</>);
}
