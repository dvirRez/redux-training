/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import { container, title, slogan } from './style.css';
import { PropTypes } from 'prop-types';
import { newDuckContainer, header } from './styles.css';
import { DuckContainer } from 'containers';
import { errorMsg } from 'sharedStyles/styles.css';

function NewDucksAvailable ({ handleClick }) {
    return (
        <div className={newDuckContainer} onClick={handleClick}>
            New Ducks Available
        </div>
    )
}

NewDucksAvailable.propTypes = {
    handleClick: PropTypes.func.isRequired
}

Feed.propTypes = {
   isFetching: PropTypes.bool.isRequired,
   error: PropTypes.string.isRequired,
   duckIds: PropTypes.array.isRequired,
   newDucksAvailable: PropTypes.bool.isRequired,
   resetNewDucksAvailable: PropTypes.func.isRequired,
};

export default function Feed (props) {

    function renderHeader() {
        return (
            <h1 className={header}>{'Fetching'}</h1>
        );
    }

    function rednderFeedBody() {
        return (
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
	return (
        props.isFetching
            ?    renderHeader() : rednderFeedBody()

	);
}
