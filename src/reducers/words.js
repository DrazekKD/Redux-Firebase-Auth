const INITIAL_STATE = {
	words: null,
	limit: 5,
};

const applySetWords = (state, action) => ({
	...state,
	words: action.words,
});

const applySetWordsLimit = (state, action) => ({
	...state,
	limit: action.limit,
});

function wordsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'WORDS_SET': {
			return applySetWords(state, action);
		}
		case 'WORDS_LIMIT_SET': {
			return applySetWordsLimit(state, action);
		}
		default:
			return state;
	}
}

export default wordsReducer;
