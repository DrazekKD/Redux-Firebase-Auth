import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
import FlashcardsList from './FlashcardsList'


class Flashcards extends Component {
	componentDidMount() {
		this.props.firebase.users().on('value', snapshot => {
			this.props.onSetUsers(snapshot.val());
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}
	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser => (
					<FlashcardsList  authUser={authUser}/>
				)}
			</AuthUserContext.Consumer>
		)
	}
}

const mapStateToProps = state => ({
	users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
	onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;
export default compose(
	withFirebase,
	withEmailVerification,
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withAuthorization(condition),
)(Flashcards);