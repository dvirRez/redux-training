/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import { container, title, slogan } from './style.css';

export default function Home () {
	return (
		<div className={container}>
			<p className={title}>{'Duckr'}</p>
			<p className={slogan}>{'The real time dag dag scalable something something'}</p>
		</div>
	);
}
