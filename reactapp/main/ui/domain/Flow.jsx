import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { LOGOUT_LINK } from '../../../routes';
import { searchTwitter } from '../../web-mobile-common/domain/actionGenerators';

class Flow extends Component {

    constructor(props) {
        super(props);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
    }

    onSearchTermChange() {
        const text = this.refs.searchTerm.value.trim();
        this.props.searchTwitter(text);
    }

    render() {
        return (
            <div className="container">
                <div className="row main">
                    <div className="col-lg-8">
                        <div className={`input-group`}>
                            <span className="input-group-addon"><i className="fa fa-search fa" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" name="searchTerm" id="searchTerm" ref="searchTerm"  placeholder="Enter search term" onChange={this.onSearchTermChange} />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        Save Search
                    </div>
                    <div className="col-lg-2">
                        Feeling Fortunate
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({ authentication }) => {
    const { user } = authentication;
    return { user }
};

export default connect(mapStateToProps, { searchTwitter })(Flow)