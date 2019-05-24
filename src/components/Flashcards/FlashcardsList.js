import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';


class FlashcardsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flashcards:'',
			loading: false,
		}
	}

	componentDidMount() {
		this.onListenForMessages();
	}

	componentDidUpdate(props) {
		if(!this.state.flashcards)
			this.onListenForMessages();
	}

	componentWillUnmount() {
		this.props.firebase.userWords().off();
	}
	onListenForMessages = () => {
		this.props.firebase
			.userWords(this.props.authUser.uid)
			.on('value', snapshot => {
				// this.props.onSetFlashcards(snapshot.val());
				this.setState({flashcards: Object.keys(snapshot.val()).map(key => snapshot.val()[key])})
			});
	};

	render() {
		const {flashcards} = this.state;
		console.log(Object.keys(flashcards).map(key => flashcards[key]))
		// const List = (flashcards) => {
		// 	return (Object.keys(flashcards).map(key => <p>{flashcards[key]}</p>))
		// }
		return (
			<div>
			 {/*<List/>*/}
			</div>
		)
	}
}
// const mapStateToProps = state => ({
// 	flashcards: state.flashcardsState.flashcards,
// });

// const mapDispatchToProps = dispatch => ({
// 	onSetFlashcards: flashcards => dispatch({ type: 'USERS_SET', flashcards }),
// });

const condition = authUser => !!authUser;
export default compose(
	withFirebase,
	withEmailVerification,
	connect(
		// mapDispatchToProps
	),
	withAuthorization(condition),
)(FlashcardsList);