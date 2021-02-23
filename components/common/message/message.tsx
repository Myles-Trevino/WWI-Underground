/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import classNames from 'classnames';

import StateContext from '../../../common/state/state-context';
import Styles from './message.module.scss';


export default observer(function Message(): JSX.Element {

	const state = useContext(StateContext);

	const [hidden, setHidden] = useState(true);


	// When the message changes...
	useEffect(() => {

		// Set a timeout to hide the message after the set duration.
		setHidden(false);
		const timeout = setTimeout(() => { setHidden(true); },
			state.app.messageDuration);

		// Destructor.
		return (): void => { clearTimeout(timeout); };
	}, [state.app.messageId]);


	// Render.
	return (
		<div className={classNames('tile', Styles.message,
			{hidden, [Styles.error]: (state.app.messageType === 'Error')})}>
			<span>{state.app.message}</span>
		</div>
	);
});
