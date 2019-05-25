import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
import FlashcardsItem from './FlashcardsItem'

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
			.once('value', snapshot => {
				if(snapshot.val())
					this.setState({flashcards: Object.keys(snapshot.val()).map(key => snapshot.val()[key])})
			});
	};


	render() {
		const {flashcards} = this.state;
		const List = () => {
			if(!!flashcards.length)
				return Object.keys(flashcards).map(item => <FlashcardsItem data={flashcards[item]}/>)
			else
				return <div> You don't have any flashcards :( </div>
		};
		return(
			<div className="flashcard-list-component">
				<List/>
			</div>
		)
	}
}
const condition = authUser => !!authUser;
export default compose(
	withFirebase,
	withEmailVerification,
	connect(
		// mapDispatchToProps
	),
	withAuthorization(condition),
)(FlashcardsList);