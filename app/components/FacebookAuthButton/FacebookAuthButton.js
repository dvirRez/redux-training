/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { button } from './style.css';

FacebookAuthButton.propTypes = {
	onAuth: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
export default function FacebookAuthButton({onAuth, isFetching}) {
	return (
		<button className={button} onClick={onAuth}>
			{isFetching
				? 'Loading'
				: 'Login with facebook'
			}
		</button>
	);
}
