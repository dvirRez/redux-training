/**
 * Created by Dvir on 1/15/2018.
 */
import React from 'react';
import { Authenticate } from 'components';
import auth from 'helpers/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends React.Component {
    static propTypes = {
        fetchAndHandleAuthedUser : PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    handleAuth = (e) => {
        e.preventDefault();
        this.props.fetchAndHandleAuthedUser()
            .then(() => this.context.router.history.replace('feed'));
    };

    render() {
        console.log('is fetching: ', this.props.isFetching);
        return (
            <div>
                <Authenticate onAuth={this.handleAuth}
                              isFetching={this.props.isFetching}
                              error={this.props.error} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.users.isFetching,
        error: state.users.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);

