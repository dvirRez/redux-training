import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import * as duckActionCreators from 'redux/modules/ducks';
import * as likeCountActionCreators from 'redux/modules/likeCount';
import * as repliesActionCreators from 'redux/modules/replies';
import { staleDucks, staleUser } from 'helpers/utils';
const { func, object, string, bool } = PropTypes;
import { DuckDetails } from 'components';

class DuckDetailsContainer extends React.Component {
    static propTypes = {
        authedUser: object.isRequired,
        duckId: string.isRequired,
        error: string.isRequired,
        isFetching: bool.isRequired,
        removeFetching: func.isRequired,
        fetchAndHandleDuck: func.isRequired,
        duckAlreadyFetched: bool.isRequired,
        initLikeFetch: func.isRequired,
        addAndHandleReply: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.initLikeFetch(this.props.duckId);
        if(this.props.duckAlreadyFetched === false) {
            this.props.fetchAndHandleDuck(this.props.duckId);
        }
        else {
            this.props.removeFetching();
        }
    }

    render() {
        return (
            <DuckDetails
                authedUser={this.props.authedUser}
                duckId={this.props.duckId}
                error={this.props.error}
                isFetching={this.props.isFetching}
                addAndHandleReply={this.props.addAndHandleReply} />
        )
    }
}

function mapStateToProps({ducks, likeCount, users}, props) {
    return {
        isFetching: ducks.get('isFetching')|| likeCount.isFetching,
        error: ducks.get('error'),
        authedUser: users[users.authId].info,
        duckId: props.match.params.duckId,
        duckAlreadyFetched: !!ducks.get(props.match.params.duckId),
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        ...duckActionCreators,
        ...likeCountActionCreators,
        ...repliesActionCreators,
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DuckDetailsContainer);