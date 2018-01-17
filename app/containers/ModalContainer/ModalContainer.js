/**
 * Created by Dvir on 1/16/2018.
 */
import React from 'react';
import { Modal } from 'components';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import * as modalActionCreators from 'redux/modules/modal';
import * as ducksActionCreators from 'redux/modules/ducks';

console.log(`Modal action creators: `, modalActionCreators);
console.log(`Duck action creators: `, ducksActionCreators);
console.log(`Combined action creators: `, {
    ...modalActionCreators,
    ...ducksActionCreators

});


function mapStateToProps({users, modal}) {
    const duckTextLength = modal.duckText.length || 0;
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        isOpen: modal.isOpen,
        duckText: modal.duckText,
        isSubmitDisabled: duckTextLength === 0 || duckTextLength > 130,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...modalActionCreators,
        ...ducksActionCreators

    }, dispatch);
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Modal);