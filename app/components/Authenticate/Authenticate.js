/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FacebookAuthButton } from 'components';
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css';

Authenticate.propTypes = {
    onAuth: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

export default function Authenticate ({onAuth, isFetching, error}) {
	return (
		<div className={centeredContainer}>
			<h1 className={largeHeader}>{'Authenticate'}</h1>
			<FacebookAuthButton onAuth={onAuth} isFetching={isFetching} />
			{error ? <p className={errorMsg}>{error}</p> : null}
		</div>
	);
}
