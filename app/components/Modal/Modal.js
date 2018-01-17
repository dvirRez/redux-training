/**
 * Created by Dvir on 1/11/2018.
 */
import React from 'react';
import { default as ReactModal } from 'react-modal';
import PropTypes from 'prop-types';
import {
    newDuckTop, pointer, newDuckInputContainer,
    newDuckInput, submitDuckBtn, darkBtn
} from './style.css'
import { formatDuck } from 'helpers/utils';

const modalStyles = {
    content: {
        width: 350,
        margin: '0px auto',
        height: 220,
        borderRadius: 5,
        background: '#EBEBEB',
        padding: 0,
    },
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    duckText: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    updateDuckText: PropTypes.func.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    duckFanout: PropTypes.func.isRequired,
};

export default function Modal (props) {
    function submitDuck () {
        const formattedDuck = formatDuck(props.duckText, props.user);
        return props.duckFanout(formattedDuck);
    }

	return (
	    <div>
            <span className={darkBtn} onClick={props.openModal}>
                {'Duck'}
            </span>
            <ReactModal ariaHideApp={false} contentLabel='Modal' style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
                <div className={newDuckTop}>
                    <span>{'Compose new Duck'}</span>
                    <span onClick={props.closeModal} className={pointer}>{'X'}</span>
                </div>
                <div className={newDuckInputContainer}>
                    <textarea
                        onChange={(e) => props.updateDuckText(e.target.value)}
                        value={props.duckText}
                        maxLength={140}
                        type='text'
                        className={newDuckInput}
                        placeholder="What's on your mind?" />
                </div>
                <button
                    className={submitDuckBtn}
                    disabled={props.isSubmitDisabled}
                    onClick={submitDuck}>
                    {'Duck'}
                </button>
            </ReactModal>
        </div>
	);
}
