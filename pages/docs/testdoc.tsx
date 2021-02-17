import Navbar from '../../components/common/navbar/navbar';
import Head from 'next/head';
import Style from './docs.module.scss';


export default function Help(): JSX.Element {
	return (<>
		<Head>
			<title>Test Doc</title>
		</Head>
		<Navbar></Navbar>
		<br></br><br></br>
		<div className = {Style.helpDocHeading}>
			<h1>Test</h1>
		</div>
		<div className = {Style.helpDocText}>
			<p>This is the body of a generic help doc</p>
		</div>
	</>);
}
