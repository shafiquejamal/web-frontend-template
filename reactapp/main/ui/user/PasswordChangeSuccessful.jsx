import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOGOUT_LINK } from '../../../routes';

class PasswordChangeSuccessful extends Component {

    componentWillMount() {
        if (!this.props.user) {
            hashHistory.push(LOGOUT_LINK)
        }
    }

    render() {
        return (
          <div className="container">
              <div className="row main">
                  <div className="col-md-4 col-md-offset-4">
                    <h1 className="title">Password Change Successful</h1>
                    <p>Password successfully changed.</p>
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

export default connect(mapStateToProps, { })(PasswordChangeSuccessful)
