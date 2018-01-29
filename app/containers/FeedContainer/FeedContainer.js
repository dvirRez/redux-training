/**
 * Created by Dvir on 1/4/2018.
 */
import React from 'react';
import { Feed } from 'components';
import { PropTypes } from 'prop-types';
import * as feedActionCreators from 'redux/modules/feed';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List }from 'immutable';

class FeedContainer extends React.Component {
    static propTypes = {
        newDucksAvailable: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        duckIds: PropTypes.instanceOf(List),
        setAndHandleFeedListener: PropTypes.func.isRequired,
        resetNewDucksAvailable: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.setAndHandleFeedListener();
    }

	render() {
		return (
			<Feed
                duckIds={this.props.duckIds}
                newDucksAvailable={this.props.newDucksAvailable}
                error={this.props.error}
                isFetching={this.props.isFetching}
                resetNewDucksAvailable={this.props.resetNewDucksAvailable}
            />
		);
	}
}

function mapStateToProps({feed}) {
    const error = feed.get('error');
    const errorString = typeof error === 'string' ? error : error.message;
    return {
        isFetching: feed.get('isFetching'),
        error: errorString,
        duckIds: feed.get('duckIds'),
        newDucksAvailable: feed.get('newDucksAvailable'),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(feedActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
