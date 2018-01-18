/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import { container, title, slogan } from './style.css';
import { PropTypes } from 'prop-types';
import { newDuckContainer, header } from './styles.css';
import { DuckContainer } from 'containers';
import { errorMsg } from 'sharedStyles/styles.css';

Feed.propTypes = {
   isFetching: PropTypes.bool.isRequired,
   error: PropTypes.string.isRequired,
   duckIds: PropTypes.array.isRequired,
   newDucksAvailable: PropTypes.bool.isRequired,
   resetNewDucksAvailable: PropTypes.func.isRequired,
};

export default function Feed (props) {

	return (
        props.isFetching
            ?   <h1 className={header}>{'Fetching'}</h1> :
            <div>
                {props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null}
                {props.duckIds.length === 0
                ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no ducks yet 😞'}</p>
                    : null}
               {props.duckIds.map((id) => (
                   <DuckContainer
                            duckId={id}
                            key={id} />
                ))}
                {props.error ? <p className={errorMsg}>{props.error}</p> : null}
            </div>
	);
}
