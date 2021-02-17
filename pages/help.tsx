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
			<br></br>
			<p><Link href = "/docs/testdoc">Test Link</Link></p>
		</div>
	</>);
}
