import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';

class Words extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
		};
	}
	componentDidMount() {
		// this.props.firebase.message(this.props.authUser.uid).on('value', snapshot => {
		// 	this.props.applySetMessages(snapshot.val());
		// });
		this.onListenForMessages();
	}
	onListenForMessages = () => {
		this.props.firebase
			.userWord(this.props.authUser.uid)
			.orderByChild('createdAt')
			.on('value', snapshot => {
				console.log(snapshot.val())
			});
	};
	onCreateMessage = (event) => {
		this.props.firebase.userWord(this.props.authUser.uid).push({
			text: this.state.text,
			createdAt: this.props.firebase.serverValue.TIMESTAMP,
		});

		this.setState({ text: '' });

		event.preventDefault();
	};
	onChangeText = event => {
		this.setState({ text: event.target.value });
	};
	render() {
		const { text } = this.state;
		console.log(this.props);
		return (
			<div>
				{this.props.authUser.email}
				<form
					onSubmit={event =>
						this.onCreateMessage(event)
					}>
					<input
						type="text"
						value={text}
						onChange={this.onChangeText}/>
					<button type="submit">Send</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	messages: state.messageState.messages,
});

const mapDispatchToProps = dispatch => ({
	applySetMessages: messages => dispatch({ type: 'MESSAGES_SET', messages }),
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