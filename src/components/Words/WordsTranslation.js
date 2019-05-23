import React, { Component } from 'react';
import { connect } from 'react-redux';
class WordsTranslation  extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		return(
			<div>
				<input
					type="text"
					value={this.props.word}
					onChange={this.onChangeText}/>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	words: state.wordsState.words,
});
const mapDispatchToProps = dispatch => ({
});
export default   connect(
	mapStateToProps,
	mapDispatchToProps,
)(WordsTranslation);