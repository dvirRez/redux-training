/**
 * Created by Dvir on 1/4/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Logout } from 'components';
import { connect } from 'react-redux';
import { logoutAndUnauth } from 'redux/modules/users';

class LogoutContainer extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.dispatch(logoutAndUnauth());
	}

	render() {
		return (
			<Logout />
		);
	}
}

export default connect()(LogoutContainer);

