import React from 'react';
import { Modal } from 'components';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { fetchAndHandleUsersDucks } from 'redux/modules/usersDucks';
import { User } from 'components';
import { PropTypes } from 'prop-types';
import * as usersActionCreators from 'redux/modules/users';
import * as usersDucksActionCreators from 'redux/modules/usersDucks';
import { staleDucks, staleUser } from 'helpers/utils';

class UserContainer extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        duckIds: PropTypes.array.isRequired,
        noUser: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        lastUpdatedUser: PropTypes.number.isRequired,
        lastUpdatedDucks: PropTypes.number.isRequired,
        routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
        fetchAndHandleUsersDucks: PropTypes.func.isRequired,
        fetchAndHandleUser: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const uid = this.props.match.params.uid;

        if( this.props.noUser || staleUser(this.props.lastUpdatedUser)) {
            this.props.fetchAndHandleUser(uid);
        }

        if( this.props.noUser || staleDucks(this.props.lastUpdatedDucks)) {
            this.props.fetchAndHandleUsersDucks(uid);
        }
    }

    render() {
        return (
            <User
            isFetching={this.props.isFetching}
            error={this.props.error}
            duckIds={this.props.duckIds}
            noUser={this.props.noUser}
            name={this.props.name} />
        )
    }
}

function mapStateToProps({users, usersDucks}, props) {
    const specificUsersDucks = usersDucks[props.match.params.uid];
    const noUser = !users[props.match.params.uid];
    const user = users[props.match.params.uid];
    const name = noUser ? '' : user.info.name;

    return {
        isFetching: users.isFetching, // || usersDucks.isFetching,
        error: users.error || usersDucks.error,
        duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
        lastUpdatedDucks: (specificUsersDucks && specificUsersDucks.length > 0) ? specificUsersDucks.lastUpdated : 0,
        lastUpdatedUser: user ? user.lastUpdated : 0,
        name,
        noUser,
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         ...usersActionCreators,
//         ...usersDucksActionCreators
//     , dispatch);
// }

function mapDispatchToProps(dispatch) {
    return {
        fetchAndHandleUsersDucks:(uid) => { dispatch(fetchAndHandleUsersDucks(uid)) },
        fetchAndHandleUser: (uid) => {dispatch(fetchAndHandleUsersDucks(uid))},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContainer);