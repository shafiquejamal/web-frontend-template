import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { LOGOUT_LINK } from '../../../routes';
import { searchTwitter, saveSearchTerm } from '../../web-mobile-common/domain/actionGenerators';

class TwitterSearch extends Component {

    constructor(props) {
        super(props);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.renderSavedSearches = this.renderSavedSearches.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.onSaveSearchResult = this.onSaveSearchResult.bind(this);
        this.onLucky = this.onLucky(this);
    }

    onSearchTermChange() {
        const text = this.refs.searchTerm.value.trim();
        this.props.searchTwitter(text);
    }

    renderSavedSearches() {
        const { savedSearchTerms } = this.props;
        console.log('savedSearchTerms', savedSearchTerms);
        return savedSearchTerms.map( savedSearchTerm => {
            return (<li key={savedSearchTerm.time}>
                {savedSearchTerm.term}
            </li>);
        })
    }

    renderSearchResults() {
        const { searchResults } = this.props;
        console.log('searchResults', searchResults);
        return searchResults.map( searchResult => {
            return (<li key={searchResult}>
                {searchResult}
            </li>);
        })
    }

    onSaveSearchResult() {
        const searchTermToSave = this.refs.searchTerm.value.trim();
        this.props.saveSearchTerm(searchTermToSave);
        this.refs.searchTerm.value = '';
    }

    onLucky() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Search Twitter</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className={`input-group`}>
                            <span className="input-group-addon"><i className="fa fa-search fa" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" name="searchTerm" id="searchTerm" ref="searchTerm"  placeholder="Enter search term" onChange={this.onSearchTermChange} />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveSearchResult}>Save Search</button>
                    </div>
                    <div className="col-lg-4">
                        <button type="button" className="btn btn-info" onClick={this.onLucky}>Feeling Fortunate</button>
                    </div>
                </div>
                <div className="row">
                    <hr/>
                    <div className="col-lg-4">
                        <h3>Saved Searches</h3>
                        <ul>
                            {this.renderSavedSearches()}
                        </ul>
                    </div>
                    <div className="col-lg-8">
                        <h3>Search Results</h3>
                        {this.renderSearchResults()}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({ authentication, twitterSearch }) => {
    const { user } = authentication;
    const { savedSearchTerms, searchResults } = twitterSearch;
    return { user, savedSearchTerms, searchResults }
};

export default connect(mapStateToProps, { searchTwitter, saveSearchTerm })(TwitterSearch)