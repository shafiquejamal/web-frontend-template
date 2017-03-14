import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivationFailed extends Component {
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

export default connect()(ActivationFailed);
