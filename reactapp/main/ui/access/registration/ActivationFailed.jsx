import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { LOGOUT_LINK } from '../../../../routes';

class ActivationFailed extends Component {

    componentWillMount() {
        if (this.props.user) {
            hashHistory.push(LOGOUT_LINK)
        }
    }

  render() {
    return (
        <div className="container">
          <div className="row main">
            <div className="col-md-4 col-md-offset-4">
              <h1 className="title">Activation Failed</h1>
              <p>Sorry, your account could not be activated. Please contact the admin to continue.</p>
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

export default connect(mapStateToProps, { })(ActivationFailed);
