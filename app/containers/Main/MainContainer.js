/**
 * Created by Dvir on 1/4/2018.
 */
import React from 'react';
import { Navigation } from 'components';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { container, innerContainer } from './styles.css';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'redux/modules/users';
import * as usersLikesActionCreators from 'redux/modules/usersLikes';
import { formatUserInfo } from 'helpers/utils';
import { firebaseAuth } from 'config/constants';

class MainContainer extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		isAuthed: PropTypes.bool.isRequired,
		authUser: PropTypes.func.isRequired,
		fetchingUserSuccess: PropTypes.func.isRequired,
        removeFetchingUser: PropTypes.func.isRequired,
        setUsersLikes: PropTypes.func.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	componentDidMount() {
		firebaseAuth().onAuthStateChanged((user) => {
			if(user) {
				const userData = user.providerData[0];
				const userInfo = formatUserInfo(userData);
				this.props.authUser(user.uid);
				this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
                this.props.setUsersLikes();
				if(this.props.location.pathname === '/') {
                    this.context.router.history.replace('feed');
				}
			}
			else {
				this.props.removeFetchingUser();
			}
		});
	}

	render() {
		return this.props.isFetching === true
			? null
			: (
				<div className={container}>
					<Navigation isAuthed={this.props.isAuthed}/>
					<div className={innerContainer}>
						{this.props.children}
					</div>
				</div>
			  );
	}
}

function mapStateToProps(state) {
    return {
		isAuthed: state.users.isAuthed,
		isFetching: state.users.isFetching,
	};
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...userActionCreators,
            ...usersLikesActionCreators
        }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));
