import React from 'react';
import PropTypes from 'prop-types';
import { DuckContainer } from 'containers';
import { userContainer, header } from './styles.css';
import { errorMsg } from 'sharedStyles/styles.css';

User.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckIds: PropTypes.array.isRequired,
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
};
export default function User (props) {
    const renderNoUser = () => (<p className={header}>{'This user doesnt exist. 👽'}</p>);


    const renderLoading = () => (<p className={header}>{'Loading'}</p>);

    const renderNoDucks = () =>
        (<p className={header}>
              {`It looks like ${props.name.split(' ')[0]} hasn't made any ducks yet.`}
            </p>);

    const renderError = () => (<p className={errorMsg}>{props.error}</p>);

    const renderDuckContainer = () => props.duckIds.map(duck =>
        (<DuckContainer  duckId={duck}
                        key={duck} />)
    );

    return (
        props.noUser ? renderNoUser() :
            <div>
                {props.isFetching ? renderLoading() :
                    <div>
                        <div className={userContainer}>
                            <div>{props.name}</div>
                        </div>
                        {renderDuckContainer()}
                        {props.duckIds.length === 0 ? renderNoDucks() : null}
                    </div>}
                {props.error ? renderError() : null}
            </div>
    )
}
