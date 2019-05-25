import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import { withFirebase } from '../Firebase';
import FlashcardsList from './FlashcardsList'
import './flashcards.scss'


class Flashcards extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (

				<div className="flip-card" aria-haspopup="true">
					<div className="flip-card-inner">
						<div className="flip-card-front">
							<div>{this.props.data.text}</div>
						</div>
						<div className="flip-card-back">
							<div>{this.props.data.translation}</div>
						</div>
					</div>
				</div>
	)
	}
}



const condition = authUser => !!authUser;
export default compose(
	withFirebase,
	withEmailVerification,
	withAuthorization(condition),
)(Flashcards);