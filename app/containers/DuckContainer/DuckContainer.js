/**
 * Created by Dvir on 1/17/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Duck } from 'components';
import * as usersLikesActionCreators from 'redux/modules/usersLikes';
import { bindActionCreators } from 'redux';
const { func, object, bool, number } = PropTypes;

class DuckContainer extends React.Component{
    constructor(props) {
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    static propTypes = {
        duck: object.isRequired,
        handleClick: func,
        hideLikeCount: bool.isRequired,
        hideReplyBtn: bool.isRequired,
        isLiked: bool.isRequired,
        numberOfLikes: number,
        addAndHandleLike: func.isRequired,
        handleDeleteLike: func.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    static defaultProps = {
        hideReplyBtn: false,
        hideLikeCount: true,
    };

    goToProfile(e) {
        e.stopPropagation();
        this.context.router.history.push('/' + this.props.duck.get('uid'));
    }

    handleClick(e) {
        e.preventDefault();
        this.context.router.history.push('/duckDetail/' + this.props.duck.get('duckId'));
    }

    render () {
        return (
            <Duck
                goToProfile={this.goToProfile}
                onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
                {...this.props} />
        )
    }
}

function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
    return {
        duck: ducks.get(props.duckId),
        hideLikeCount: props.hideLikeCount,
        hideReplyBtn: props.hideReplyBtn,
        isLiked: usersLikes[props.duckId] === true,
        numberOfLikes: likeCount[props.duckId],
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(usersLikesActionCreators, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DuckContainer)