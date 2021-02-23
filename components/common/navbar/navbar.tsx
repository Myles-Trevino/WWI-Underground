/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useState} from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import Styles from './navbar.module.scss';


type Props = {color?: string};


export default function Navbar({color = 'transparent'}: Props): JSX.Element {

	const [menu, setMenu] = useState(false);


	// Menu SVGs.
	const openMenuSvg = <svg className={classNames(Styles.menuSvg, 'button')} onClick={(): void => { setMenu(true); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
		<rect className="svg-filled-glyph" x="8.97" y="9.37" width="14" height="1.75"/>
		<rect className="svg-filled-glyph" x="9" y="15" width="14" height="1.75"/>
		<rect className="svg-filled-glyph" x="9" y="20.66" width="14" height="1.75"/>
	</svg>;

	const closeMenuSvg = <svg className={classNames(Styles.menuSvg, 'button')} onClick={(): void => { setMenu(false); }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
		<polygon className="svg-filled-glyph" points="22.82 10.64 21.61 9.36 16 14.67 10.39 9.36 9.18 10.64 14.73 15.88 9.18 21.11 10.39 22.39 16 17.08 21.61 22.39 22.82 21.11 17.27 15.88 22.82 10.64"/>
	</svg>;

	// Render.
	return (<div className={Styles.navbar} style={{backgroundColor: color}}>

		{/* Logo. */}
		<Link href="/">
			<svg className={classNames(Styles.logo, 'button')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path className="svg-filled-glyph" d="M7.85,8.25H11.9v8.2s0,6.48,6,7.63c-10.1,1.56-10-7.94-10-7.94Z"/>
				<path className="svg-filled-glyph" d="M19.87,8.25h4s0,7.27,0,8c0,1.43-1.05,5.33-6,3.62,2-1,2-3.62,2-3.62Z"/>
			</svg>
		</Link>

		{/* Empty space. */}
		<div/>

		{/* Links. */}
		<Link href="/login"><span className="button">Log In</span></Link>
		<Link href="/tour"><span className="button">Tour</span></Link>
		<Link href="/help"><span className="button">Help</span></Link>
		<Link href="/about"><span className="button">About</span></Link>

		{/* Menu SVG. */}
		{menu ? closeMenuSvg : openMenuSvg}

		{/* Menu overlay. */}
		{menu && <div className={Styles.menuOverlay}>
			<Link href="/login"><h2>Log In</h2></Link>
			<Link href="/tour"><h2>Tour</h2></Link>
			<Link href="/help"><h2>Help</h2></Link>
			<Link href="/about"><h2>About</h2></Link>
		</div>}

	</div>);
}
