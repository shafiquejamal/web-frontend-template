import moment from 'moment'
import { ADD_SEARCH_TERM, CLEAR_SEARCH_TERMS, SEARCH_RESULTS } from './types';

const INITIAL_STATE = {
    savedSearchTerms: [],
    searchResults: []
};

const sortDesc = (a, b) => { return b.createdAt - a.createdAt };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SEARCH_TERM:
            const newSearchTerm = action.payload;
            return {
                ...state,
                savedSearchTerms: state.savedSearchTerms.concat([newSearchTerm]).sort(sortDesc)
            };
        case CLEAR_SEARCH_TERMS:
            return {
                ...state,
                savedSearchTerms: []
            };
        case SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload.sort(sortDesc).map(searchResult => {
                    return { id: searchResult.id,
                    author: searchResult.author,
                    text: searchResult.text,
                    createdAt: moment(searchResult.createdAt).format('MMMM Do YYYY, h:mm:ss a') }})
            };
        default:
            return state;
    }
}