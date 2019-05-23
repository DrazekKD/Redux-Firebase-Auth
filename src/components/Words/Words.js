import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
import WordsTranslation from './WordsTranslation'
import {googleTranslate } from '../../operations/operations'
class Words extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			translateText:''
		};
	}
	componentDidMount() {
		this.onListenForMessages();
	}

	componentDidUpdate(props) {
		if (props.limit !== this.props.limit) {
			this.onListenForMessages();
		}
	}

	componentWillUnmount() {
		this.props.firebase.userWords().off();
	}
	onListenForMessages = () => {
		this.props.firebase
			.userWords(this.props.authUser.uid)
			.orderByChild('createdAt')
			.on('value', snapshot => {
				this.props.onSetWords(snapshot.val());
			});
	};
	onCreateMessage = (event) => {
		this.props.firebase.userWords(this.props.authUser.uid).push({
			text: this.state.text,
			createdAt: this.props.firebase.serverValue.TIMESTAMP,
			translation: '',
			language: ''
		});
		this.setState({ text: '' });
		event.preventDefault();
	};
	onChangeText = event => {
		this.setState({ text: event.target.value });
	};

	onTranslate = () =>{
		console.log(this.state.text);
		googleTranslate.translate( this.state.text, 'pl', function(err, translation) {

			console.log(translation)
		});
	};

	render() {
		const { text } = this.state;
		return (
			<div>
				{/*<WordsTranslation/>*/}
				<form
					onSubmit={event =>
						this.onCreateMessage(event)
					}>
					<input
						type="text"
						value={text}
						onChange={this.onChangeText}/>
					<button type="button" onClick={this.onTranslate}>Translate</button>
					<button type="submit">Send</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	words: state.wordsState.words,
});

const mapDispatchToProps = dispatch => ({
	onSetWords: words =>
		dispatch({ type: 'WORDS_SET', words }),
});

const condition = authUser => !!authUser;

export default compose(
	withFirebase,
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withEmailVerification,
	withAuthorization(condition),
)(Words);