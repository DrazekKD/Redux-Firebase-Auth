import React, { Component } from 'react';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
class Words extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			translateText:'',
			sourceLanguage:'pl',
			targetLanguage:'en'
		};
	}
	// componentDidMount() {
	// 	this.onListenForMessages();
	// }
	//
	// componentDidUpdate(props) {
	// 	if (props.limit !== this.props.limit) {
	// 		this.onListenForMessages();
	// 	}
	// }
	//
	// componentWillUnmount() {
	// 	this.props.firebase.userWords().off();
	// }
	// onListenForMessages = () => {
	// 	this.props.firebase
	// 		.userWords(this.props.authUser.uid)
	// 		.orderByChild('createdAt')
	// 		.on('value', snapshot => {
	// 			this.props.onSetWords(snapshot.val());
	// 		});
	// };
	onCreateMessage = (event) => {
		this.props.firebase.userWords(this.props.authUser.uid).push({
			text: this.state.text,
			createdAt: this.props.firebase.serverValue.TIMESTAMP,
			translation: this.state.translateText,
			language: ''
		});
		this.setState({ text: '',translateText:'' });
		event.preventDefault();
	};
	onChangeText = event => {
		this.setState({ text: event.target.value });
	};
	onChangeTranslateText = event => {
		this.setState({ translateText: event.target.value });
	};
	onTranslate = (text,sourceLanguage,targetLanguage) =>{
		fetch(`https://translation.googleapis.com/language/translate/v2
					?key=${process.env.REACT_APP_API_KEY_GOOGLE_TRANSLATION}
					&q=${text}
					&source=${sourceLanguage}
					&target=${targetLanguage}`)
			.then(res => res.json())
			.then(json =>this.setState(
				{translateText: json.data.translations[0].translatedText}));
	};

	render() {
		const { text, translateText, targetLanguage ,sourceLanguage} = this.state;
		return (
			<div>
				<form
					onSubmit={event =>
						this.onCreateMessage(event)
					}>
					<input
						type="text"
						value={text}
						onChange={this.onChangeText}/>
					<input
						type="text"
						value={translateText}
						onChange={this.onChangeTranslateText}/>
					<button type="button" onClick={()=>this.onTranslate(text,sourceLanguage,targetLanguage)}>Translate</button>
					<button type="submit" disabled={!(!!translateText && !!text)}>Send</button>
				</form>
			</div>
		)
	}
}

const condition = authUser => !!authUser;

export default compose(
	withFirebase,
	withEmailVerification,
	withAuthorization(condition),
)(Words);