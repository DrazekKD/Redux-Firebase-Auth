const INITIAL_STATE = {
	flashcards: null,
	limit: 5,
};

const applySetFlashcards = (state, action) => ({
	...state,
	words: action.words,
});

const applySetFlashcardsLimit = (state, action) => ({
	...state,
	limit: action.limit,
});

function flashcardsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'FLASHCARDS_SET': {
			return applySetFlashcards(state, action);
		}
		case 'FLASHCARDS_LIMIT_SET': {
			return applySetFlashcardsLimit(state, action);
		}
		default:
			return state;
	}
}

export default flashcardsReducer;
