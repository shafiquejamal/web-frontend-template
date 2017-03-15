import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { activateUserThroughSocket } from '../../../web-mobile-common/access/activation/actionGenerators';
import { LOGOUT_LINK } from '../../../../routes';

class Activate extends Component {

  componentWillMount() {
      if (this.props.user) {
          hashHistory.push(LOGOUT_LINK)
      } else {
          const { email, code } = this.props.location.query;
          this.props.activateUserThroughSocket(email, code)
      }
  }

  render() {
    return (
        <div className="container">
          <div className="row main">
            <div className="col-md-4 col-md-offset-4">
              <h1 className="title">Activation Successful</h1>
              <p>Please log in to your account to continue.</p>
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

export default connect(mapStateToProps, { activateUserThroughSocket })(Activate);
