import { ADD_SEARCH_TERM, CLEAR_SEARCH_TERMS, SEARCH_RESULTS } from './types';

const INITIAL_STATE = {
    savedSearchTerms: [ { term: 'term one', time: 1 }, { term: 'term two', time: 2 } ],
    searchResults: [ 'result uno', 'result dos']
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SEARCH_TERM:
            const newSearchTerm = action.payload;
            return {
                ...state,
                savedSearchTerms: state.savedSearchTerms.concat([newSearchTerm])
            };
        case CLEAR_SEARCH_TERMS:
            return {
                ...state,
                savedSearchTerms: []
            };
        case SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        default:
            return state;
    }
}