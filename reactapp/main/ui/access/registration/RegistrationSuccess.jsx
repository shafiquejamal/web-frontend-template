import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { LOGOUT_LINK } from '../../../../routes';

class RegistrationSuccess extends Component {

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
              <h1 className="title">Registration Successful</h1>
              <p>Registration successful. Please check your email (including junk and spam folders) for the activation link.</p>
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

export default connect(mapStateToProps, { })(RegistrationSuccess);
