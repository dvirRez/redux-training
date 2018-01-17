/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { container, navContainer, link } from './style.css';
import  { ModalContainer } from 'containers';

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
	isAuthed: PropTypes.bool.isRequired,
};

function NavLinks ({isAuthed}) {
	return (
		isAuthed
			? <ul>
				<li><Link className={link} to='/'>{'Home'}</Link></li>
			</ul>
			: null
	);
}

function ActionLinks ({isAuthed}) {
	return (
		isAuthed
			? <ul>
				<li><ModalContainer /></li>
				<li><Link className={link} to='/logout'>{'Logout'}</Link></li>
			</ul>
			: <ul>
				<li><Link className={link} to='/'>{'Home'}</Link></li>
				<li><Link className={link} to='/login'>{'Login'}</Link></li>
			</ul>
	);
}

export default function Navigation ({isAuthed}) {
	return (
		<div className={container}>
			<nav className={navContainer}>
				<NavLinks isAuthed={isAuthed} />
				<ActionLinks isAuthed={isAuthed} />
			</nav>
		</div>
	);
}
