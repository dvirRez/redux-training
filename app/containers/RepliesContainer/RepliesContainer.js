/**
 * Created by Dvir on 1/17/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as repliesActionCreators from 'redux/modules/replies';
import { bindActionCreators } from 'redux';
import { staleReplies } from 'helpers/utils';
import  { Replies } from 'components';

class RepliesContainer extends React.Component{
    static propTypes: {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        lastUpdated: PropTypes.number.isRequired,
        replies: PropTypes.object,
        duckId: PropTypes.string.isRequired,
        fetchAndHandleReplies: PropTypes.func.isRequired,
    };

    static defaultProps = {
        lastUpdated: 0,
        replies: {},
    };

    componentWillMount() {
        if (staleReplies(this.props.lastUpdated)) {
            this.props.fetchAndHandleReplies(this.props.duckId)
        }
    }

    render () {
        return (
            <Replies
                isFetching={this.props.isFetching}
                error={this.props.error}
                lastUpdated={this.props.lastUpdated}
                replies={this.props.replies} />
        )
    }
}

function mapStateToProps (state, props) {
    const duckRepliesInfo = state.replies && state.replies[props.duckId];
    const lastUpdated = duckRepliesInfo ? duckRepliesInfo.lastUpdated : 0;
    const replies = duckRepliesInfo ? duckRepliesInfo.replies : {};

    return {
        isFetching: state.replies.isFetching,
        error: state.replies.error,
        lastUpdated,
        replies,
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepliesContainer);